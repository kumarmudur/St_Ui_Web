import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '../common/Grid';
import {  PAGE_SIZE_OPTIONS, PAGE_SIZE_DEFAULT, RECORD_MIN_VALUE, DEFAULT_ACTIVE_PAGE } from '../../constants';
import { DropdownBox , PaginationBox, NoRecordFound } from '../../components/common';
import '../../styles/pagination.scss';

class ViewRoleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            template: props.template,
            data: props.rolesData,
            activePage: DEFAULT_ACTIVE_PAGE,
            recordsCount: '',
            pageSize: PAGE_SIZE_DEFAULT,
            recordsMin: RECORD_MIN_VALUE,
            recordsMax: PAGE_SIZE_DEFAULT,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            template: nextProps.template,
            data: nextProps.rolesData,
            recordsCount: nextProps.recordsCount,
        });
    }

    _clickHandler = (link, id) => {
        if ( link === 'EDIT_ROLE' ) {
            this.props.editRole(link, id);
        } else if ( link === 'DELETE_USER' ) {
            this.props.deleteRole(link, id);
        }
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


    render() {
        const { template, recordsCount, activePage, pageSize, recordsMin, recordsMax } = this.state;
        const { head, body } = template;
        return (
            <div>
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
                </div>
                </Fragment> : null
            }
            {
          recordsCount ? <Fragment>
          <Grid 
            head={ head }
            body={ body }
            clickHandlerFn= { this._clickHandler }
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

ViewRoleComponent.defaultProps = {
    template: {
        head: [],
        body:[]
    },
    getData: null
};

ViewRoleComponent.propTypes = {
    template: PropTypes.array,
    getData: PropTypes.func
};

export default ViewRoleComponent;