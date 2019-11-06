import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '../../common/Grid';
import { ICONS, PAGE_SIZE_OPTIONS, PAGE_SIZE_DEFAULT, RECORD_MIN_VALUE, DEFAULT_ACTIVE_PAGE  } from '../../../constants';
////import { Filter } from '../containers/Filter';
//import { Filter } from '../../../containers/Filter';
 import { DropdownBox , Filter , PaginationBox, NoRecordFound } from '../../common';
//import { camelCaseToSentenceCase } from '../../../utils/camelCaseToSentenceCase';
import { sentenceCaseToCamelCase } from '../../../utils/sentenceCaseToCamelCase';
import { save, loadData } from '../../../utils/storage';
import { managePurchaseOrderTemplate } from '../../../utils/InventoryManagement/Templates/managePurchaseOrder';

class ManagePurchaseOrderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      template: props.template,
      data: props.purchaseOrderData,
      showFilterBox: false,
      checkedBoxes: [],
      activePage: DEFAULT_ACTIVE_PAGE,
      recordsCount: props.recordsCount,
      pageSize: PAGE_SIZE_DEFAULT,
      recordsMin: RECORD_MIN_VALUE,
      recordsMax: PAGE_SIZE_DEFAULT,
      allColumns: props.allColumns,
      isFilter: false,
      isSearch: false,
      searchParams: props.searchParams,
      order: props.order || 'DESC',
    };
  }

  componentWillReceiveProps(nextProps) {
    let { recordsMax } = this.state;
    const { recordsCount } = nextProps;
    if(nextProps &&  nextProps.recordsCount && recordsCount < recordsMax) {
      recordsMax = recordsCount;
    }
    this.setState({
        template: nextProps.template,
        data: nextProps.purchaseOrderData,
        recordsCount: nextProps.recordsCount || 0,
        allColumns: nextProps.allColumns,
        isSearch: nextProps.isSearch,
        searchParams: nextProps.searchParams,
        recordsMax
    });

    let preSelectedFilter =  loadData('manage-purchase-order');
        preSelectedFilter = preSelectedFilter ? preSelectedFilter.data : [];
        if(preSelectedFilter && preSelectedFilter.length>0) {
          const hideBox = true;
          this._filter(preSelectedFilter, hideBox, nextProps.purchaseOrderData);
        }

 }

 _filterBoxToggle = () => {
  let { showFilterBox } = this.state;
  this.setState({
      showFilterBox: !showFilterBox
  });
}

_checkboxChange = e => {
  const { id, checked } = e.target;
  let { checkedBoxes } = this.state;
  if(checked == true) { checkedBoxes.indexOf(id) === -1 ? checkedBoxes.push(sentenceCaseToCamelCase(id)) : ''; }
  else if(checked == false) { checkedBoxes.indexOf(id) !== -1 ? checkedBoxes.splice(sentenceCaseToCamelCase(id), 1) : ''; }
  this.setState({
      checkedBoxes
  });
}

/* _filter = (checkedBoxes, hideBox) => {
  //const { checkedBoxes } = this.state;
  const data = {
    checkedBoxes,
    isFilter: true
  };
  this.props.filter(data);
  if(hideBox===null || !hideBox) { this._filterBoxToggle(); }
}
 */
_filter = (checkedBoxes, hideBox, newData) => {
  let { data } = this.state;
  if(newData && newData.length>0) { data = newData; }

  save('manage-purchase-order', checkedBoxes);
  const gridTemplate = data && data.length>0 ? managePurchaseOrderTemplate(data, checkedBoxes) : { 'head': [], 'body': [] };
  this.setState({
      template: gridTemplate
  });
  if(hideBox===null || !hideBox) { this._filterBoxToggle(); }
}

_clickHandler = (link, id) => {
  if ( link === 'EDIT_PURCHASE_ORDER' ) {
      this.props.editProduct(link, id);
  } else if ( link === 'DELETE_PURCHASE_ORDER' ) {
      this.props.deletePurchaseOrder(id);
  }
}

_handlePageChange = (pageNumber) => {
  const { pageSize, recordsCount, isSearch, isFilter, searchParams } = this.state;
  let pageValue = pageNumber - 1;
  let recordsMinValue = (pageSize * pageValue ) + 1;
 let recordsMaxValue = (pageSize * pageNumber );
  if(recordsMaxValue >= recordsCount) {
    recordsMaxValue = recordsCount;
  } 
  if(isFilter) {
    this.props.getFilterData({
      pageNumber: pageNumber,
      pageSize: pageSize
    });
  } else if (isSearch) {
    this.props.getData({
      pageNumber: pageNumber,
      pageSize: pageSize,
      searchParams: searchParams
    });
  } else {
    this.props.getData({ 
      pageNumber: pageNumber,
      pageSize: pageSize
    });
  }
  this.setState({
    recordsMin: recordsMinValue,
    recordsMax: recordsMaxValue,
    activePage: pageNumber
  });
}

_handlePageSizeChange = pageSize => {
    const { recordsCount, isFilter, isSearch, searchParams } = this.state;
   
    if(isFilter) {
      this.props.getFilterData({
        pageNumber: 0,
        pageSize: pageSize.value
      });
    } else if (isSearch) {
      this.props.getData({ 
        pageNumber: 0,
        pageSize: pageSize.value,
        searchParams: searchParams
      });
    } 
    else {
      this.props.getData({ 
        pageNumber: 0,
        pageSize: pageSize.value
      });
    }
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
    pageSize,
    order,
    sortBy,
  });
  this.setState({ 
    order
  });
}


  render() {
    const { template, showFilterBox, recordsCount, activePage, pageSize, recordsMin, recordsMax, allColumns } = this.state;
    const { head, body } = template;
    return (
      <div className="container">
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

          <div className="filter">{ body && body.length > 0 ? <div onClick={ this._filterBoxToggle }>  <img className='filterIcon' src={ ICONS.FILTER } width="12" alt="" title="Filter Users" /> </div> : '' }</div>
          </div>
         </Fragment> : null
       }
      
      { showFilterBox && <Filter page="manage-purchase-order"  allColumns={ allColumns }  _filterBoxToggle={ this._filterBoxToggle } _filter={ this._filter } /> }
       {
          recordsCount ? <Fragment>
          <Grid 
            head={ head }
            body={ body }
            clickHandlerFn= { this._clickHandler }
            sortHandlerFn = { this._sortHandlerFn }
          />
           <PaginationBox 
             activePage={ activePage }
             itemsCountPerPage={ pageSize }
             recordsCount={ recordsCount }
             handlePageChange={ this._handlePageChange } 
           />
          </Fragment> : <NoRecordFound />
        }
      </div>
    );
  }
}

ManagePurchaseOrderComponent.defaultProps = {
  template: {
      head: [],
      body:[]
  }
};

ManagePurchaseOrderComponent.propTypes = {
  template: PropTypes.array
};

export default ManagePurchaseOrderComponent;
