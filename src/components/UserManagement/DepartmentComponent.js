import React, {  Component, Fragment } from 'react';
import FloatingLabel from 'floating-label-react';
import { Input, Button } from '../common';
import { ICONS } from '../../constants';
import { departmentValidation } from '../../utils/validations';

class DepartmentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subDepartmentList: [],
            subDepartmentName: '',
            department: '',
            errors: {}
        };
    }

    _addSubDepartment = () => {
        const { subDepartmentList, subDepartmentName} = this.state;
        if(subDepartmentName) {
            const isOnTheList = subDepartmentList.some(list => list.subDepartmentName === subDepartmentName);
            if(!isOnTheList) {
                this.setState({
                    subDepartmentList: subDepartmentList.concat([ { subDepartmentName: subDepartmentName }]),
                    subDepartmentName: ''
                });
            }
        }
    }

    _onFieldChange = e => {
        const { value, name } = e.target;
        this.setState({
            [name]: value,
            errors: {}
        });
    }

    _onFieldInlineChange = e => {
        const { subDepartmentList } = this.state;
        const { name } = e.target;
        const newSubDepartment = subDepartmentList.map((subDepartmentName, $index) => {
            if(parseInt(name) !== $index) return subDepartmentName;
            return { ...subDepartmentName, subDepartmentName: e.target.value };
        });
        this.setState({
            subDepartmentList: newSubDepartment
        });
    }

    _deleteSubDepartment = e => {
        const { subDepartmentList } = this.state;
        const { id } = e.target;
        this.setState({
            subDepartmentList: subDepartmentList.filter((s, index) => parseInt(id) !== index)
        });
    }

    _submitForm = () => {
        const { department, subDepartmentList} = this.state;
        let status = this._checkValidation();
        if(status) {
            const dataObj = {
                departmentName: department,
                subDepartments: subDepartmentList
            };
            this.props.submitForm(dataObj);
        }
       
    }

    _checkValidation = () => {
        let { department } = this.state;
        const formStatus = departmentValidation(department);
        this.setState({
          errors: formStatus.errors,
          isFormValid: formStatus.formIsValid,
        });
        return formStatus.status;
      } 

    _cancelForm = () => {
        this.props.cancelForm();
    }

    _clearForm = () => {
        this.setState({
            department: '',
            subDepartmentName: '',
            subDepartmentList: []
        });
    }

    render() {
        const { department, subDepartmentName, subDepartmentList } = this.state;
        const { errorDepartment } = this.state.errors;
        return (
            <Fragment>
                <div className="header-label">
                    <p>ADD DEPARTMENT</p>
                </div>
                <div className="row">
                  <span className="wrapper">
                  <FloatingLabel 
                    className="form-input" 
                    placeholder="Department Name*" 
                    type="text" 
                    name="department"
                    value={ department }
                    maxLength={ 30 }
                    onChange={ this._onFieldChange  }
                  />
                 <div className="error">{ errorDepartment }</div>
                 </span>
                </div>
                <div className="header-subdepartment">
                    <p>Sub-department</p>
                </div>
                <div className="row">
                    <Input 
                      className="form-input" 
                      placeholder="Sub-department name" 
                      type="text" 
                      name="subDepartmentName"
                      value={ subDepartmentName }
                      textChange={ this._onFieldChange }
                    />
                    <Button name="ADD" className="btn-footer-submit" onClick={ this._addSubDepartment }/>
                </div>
                <div className="row-subdepartment">
                    { subDepartmentList.map((department, index) => (
                        <span className="sub-department">
                          <Input 
                            className="form-input" 
                            type="text" 
                            index={ index }
                            name={ index }
                            value={ department.subDepartmentName }
                            textChange={ this._onFieldInlineChange }
                          />
                         <div class="input-label">
                            <img className="delete" id={ index } src={ ICONS.DELETE } width="12" title="delete" onClick={ this._deleteSubDepartment }/>
                         </div>
                        </span>
                    ))
                  }
                </div>
                <div className="btn-group-footer">
                    <Button name="Cancel" className="btn-footer-cancel" onClick={ this._cancelForm } />
                    <Button name="Clear" className="btn-footer-cancel" onClick={ this._clearForm }/>
                    <Button name="Add Department" className="btn-footer-submit department-submit" onClick={ this._submitForm }/>
                </div>
            </Fragment>
        );
    }
}

export default DepartmentComponent;