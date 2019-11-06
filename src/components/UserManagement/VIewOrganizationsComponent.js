import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '../common/Grid';
import { Button } from '../common';

class ViewOrganizationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: props.template || [],
            template: props.template,
            data: props.organizationsData,
            disabledEdit: false,
            checkBoxes: [],
            isDisabledOfficeBtn: true,
            isDisabledDeleteOfficeBtn: true
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            template: nextProps.template,
            data: nextProps.organizationsData,
            isDisabledOfficeBtn: nextProps.disabledEditOffice,
            isDisabledDeleteOfficeBtn: nextProps.disabledDeleteOffice
        });
    }

    _showAddDepartment = () => {
        this.props.addDepartment(true);
    }

    _showOffice = () => {
        this.props.showOffice();
    }

    _editOffice = () => {
        this.props.editOffice();
    }

    _deleteOffice = () => {
        this.props.deleteOffice();
    }

    _selectedRow = data => {
        const { id, checked } = data;
        const splitValue = id.split('_');
        const officeId = parseInt(splitValue[1]);
        let checkValues = [ ...this.state.checkBoxes];
        if(checked === true) { checkValues.indexOf(officeId) === -1 ? checkValues.push(officeId) : ''; }
        else if(checked === false ) { checkValues.indexOf(officeId) !== -1 ? checkValues.splice(checkValues.indexOf(officeId), 1) : ''; }
        this.setState({
            checkBoxes : checkValues
        });
        this.props.getOfficeIds(checkValues);

    }

    clickHandler = (link, id )=> {
        if ( link === 'EDIT_OFFICE' ) {
            this.props.editOffice();
        } else if ( link === 'DELETE_OFFICE' ) {
            this.props.deleteOffice(id);
        }
    }

    render() {
      const { template, disabledEdit, isDisabledDeleteOfficeBtn } = this.state;
      const { head, body } = template;
      return (
          <div className="viewrole-container">
              <h3 className="organizationSideheading">User Organization</h3>
              <Button type="button" name="Delete" className="btn-org-delete" onClick={ this._deleteOffice } disabled={ isDisabledDeleteOfficeBtn }/>
              <Button type="button" name="Add Department" className="btn-org-delete" disabled={ disabledEdit } onClick={ this._showAddDepartment }/>
              <Button type="button" name="Add Office" className="btn-org-delete" onClick={ this._showOffice }/>
              <Grid 
                head={ head } 
                body={ body }
                checkHandlerFn={ this._selectedRow }
                clickHandlerFn={ this.clickHandler }
              />
          </div>
      );
    }
}

ViewOrganizationComponent.defaultProps = {
    template: {
        head: [],
        body:[]
    },
    getData: null
};

ViewOrganizationComponent.propTypes = {
    template: PropTypes.array,
    getData: PropTypes.func
};

export default ViewOrganizationComponent;