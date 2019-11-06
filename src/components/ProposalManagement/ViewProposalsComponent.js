import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '../common/Grid';
import {  ICONS, PAGE_SIZE_OPTIONS, PAGE_SIZE_DEFAULT, RECORD_MIN_VALUE, DEFAULT_ACTIVE_PAGE } from '../../constants';
import { viewProposalsTemplate } from '../../utils/viewProposalsTemplate';
//import { Filter } from '../../containers/Filter';
 import { DropdownBox , Filter , PaginationBox } from '../../components/common';

//import { camelCaseToSentenceCase } from '../../utils/camelCaseToSentenceCase';
import { sentenceCaseToCamelCase } from '../../utils/sentenceCaseToCamelCase';
import { save, loadData } from '../../utils/storage';

import '../../styles/users.scss';

class ViewProposalsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          //preSelectedFilter,
          boxes:[],
          showFilterUsersBox: false,
          checkedBoxes: [],
          template: props.template,
          data: props.proposalsData,
          activePage: DEFAULT_ACTIVE_PAGE,
          recordsCount: props.recordsCount,
          pageSize: PAGE_SIZE_DEFAULT,
          recordsMin: RECORD_MIN_VALUE,
          recordsMax: PAGE_SIZE_DEFAULT,
          order: props.order || 'DESC',
        };

    }

    componentWillReceiveProps(nextProps) {
      if(nextProps) {
       this.setState({
            template: nextProps.template,
            data: nextProps.proposalsData,
            recordsCount: nextProps.recordsCount,
            //preSelectedFilter,
        });
      }

        let preSelectedFilter =  loadData('view-proposals');
        preSelectedFilter = preSelectedFilter ? preSelectedFilter.data : [];
        if(preSelectedFilter && preSelectedFilter.length>0) {
          const hideBox = true;
          this._filter(preSelectedFilter, hideBox, nextProps.proposalsData);
        }

    }


    clickHandler = (link, id) => {
        if ( link === 'PROPOSAL_DETAILS' ) {
            this.props.viewDetailsfn(link, id);
        }
    }



    _filter = (checkedBoxes, hideBox, newData) => {
      let { data } = this.state;
      if(newData && newData.length>0) { data = newData; }

      save('view-proposals', checkedBoxes);
      const gridTemplate = data && data.length>0 ? viewProposalsTemplate(data, checkedBoxes) : { 'head': [], 'body': [] };
      this.setState({
          template: gridTemplate
      });
      if(hideBox===null || !hideBox) { this._filterBoxToggle(); }
  }

  _filterBoxToggle = () => {
    let { showFilterUsersBox } = this.state;

    this.setState({
        showFilterUsersBox: !showFilterUsersBox
    });
}
    _handlePageChange = (pageNumber) => {
      const { pageSize, recordsCount } = this.state;
      let pageValue = pageNumber - 1;
      let recordsMinValue = (pageSize * pageValue ) + 1;
      let recordsMaxValue = (pageSize * pageNumber );
        if(recordsMaxValue >= recordsCount) {
          recordsMaxValue = recordsCount;
        } 
       
        this.props.getData({ 
          pageNumber: pageNumber,
          pageSize: pageSize
        });
    
        this.setState({
          recordsMin: recordsMinValue,
          recordsMax: recordsMaxValue,
          activePage: pageNumber
        });
    }
      
      _handlePageSizeChange = pageSize => {
        const { recordsCount } = this.state;
        this.props.getData({ 
            pageNumber: 0,
            pageSize: pageSize.value
        });
          
          let recordsMinValue = RECORD_MIN_VALUE;
          let recordsMaxValue = pageSize.value;
          if(recordsMaxValue >= recordsCount) {
            recordsMaxValue = recordsCount;
          }
          this.setState({
            pageSize: pageSize.value,
            recordsMin: recordsMinValue,
            recordsMax: recordsMaxValue,
            activePage: DEFAULT_ACTIVE_PAGE
          });
    }

    _sortHandlerFn = name => {
      const sortBy = sentenceCaseToCamelCase(name);
      let { pageSize } = this.state;
      let { order } = this.props;
      if(order === 'DESC') { order = 'ASC'; }
      else if(order === 'ASC') { order = 'DESC'; }

      this.props.getData({ 
        pageNumber: 0,
        pageSize: pageSize,
        order,
        sortBy,
      });
    }

    render() {
      const {  showFilterUsersBox, recordsCount, activePage, pageSize, recordsMin, recordsMax, template } = this.state;
      const { head, body, allColumns } = template; // allColumns
        return (
          <div className='container'>
           {
              recordsCount ? <Fragment>
                <div className="records">
                  <div className="row-info">
                  <span className="row-min">{ recordsMin }</span>
                  { ' - ' }
                  <span className="row-max">{ recordsMax }</span>
                  { ' of ' }
                  <span className="row-count">{ recordsCount }</span>
                  </div> 

                  <div className="page-options">
                        <div>
                            <span className="show">Show</span>
                            <span className="page-ddb">
                            <DropdownBox 
                              options= { PAGE_SIZE_OPTIONS ? PAGE_SIZE_OPTIONS : [] }
                              placeholder={ pageSize }
                              onChangeSelect= { this._handlePageSizeChange }
                            />
                            </span>
                        </div>
                    </div>
                  <div className="filter">{ body && body.length > 0 ? <div onClick={ this._filterBoxToggle }>  <img className='filterIcon' src={ ICONS.FILTER } width="12" alt="" title="Filter Proposals" /> </div> : ''  }</div>
                </div>
              </Fragment> : null
            }
            { showFilterUsersBox && allColumns && allColumns.length>0 && <Filter page="view-proposals" allColumns={ allColumns } onBlur={ this._filterBoxToggle }  _filterBoxToggle={ this._filterBoxToggle } _filter={ this._filter } /> }
          <Grid 
            head={ head }
            body={ body }
            clickHandlerFn = { this.clickHandler }
            sortHandlerFn = { this._sortHandlerFn }
          />
          
          
             {
                recordsCount ? <PaginationBox 
                  activePage={ activePage }
                  itemsCountPerPage={ pageSize }
                  recordsCount={ recordsCount }
                  handlePageChange={ this._handlePageChange } /> : null
             }
        </div>
        );
    }
}

ViewProposalsComponent.defaultProps = {
    template: {
        head: [],
        body:[]
    },
    getData: null
};

ViewProposalsComponent.propTypes = {
    template: PropTypes.array,
    getData: PropTypes.func
};

export default ViewProposalsComponent;
