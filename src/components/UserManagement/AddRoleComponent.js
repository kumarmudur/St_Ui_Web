import React, { Component } from 'react';

import { Input, Button } from '../common';
import { ROLE_NAV_BUTTON } from '../../constants';
import { getLength } from '../../utils/utility';
import { rolePageValidation } from '../../utils/validations';

class AddRoleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            roleName: '',
            roleDiscription: '',
            modules: [],
            permissions: [],
            currentTabBtn: 'User Management',
            postData: {},
            checkedBoxes:[],
            currentFeature: 'Manage Users',
            modifiedObj: [],
            className: '',
            btnTabName: ROLE_NAV_BUTTON.USER_MANAGEMENT,
            errors: {},
            isFormValid: true
        };
    }

    componentDidMount() {
        this.props.getRolesData();
    }

    componentWillReceiveProps(nextProps) {
        const { id, roleData, roles } = nextProps;
        let roleName, roleDiscription, modulesList, permissions, rolesList;
        if(id && roleData) {
                roleName = roleData.roleName;
                roleDiscription = roleData.roleDiscription;
                modulesList =  getLength(roleData.modules) > 0 ? roleData.modules : '';
            
        } else if(roles) {
                this._createModifiedObj(roles);
                modulesList =  getLength(roles.modules) > 0 ? roles.modules : '';
                permissions = getLength(roles.permissions) > 0 ? roles.permissions : '';
                rolesList = roles;
        }
        this.setState({
            roleName: roleName,
            roleDiscription: roleDiscription,
            modules: modulesList,
            permissions: permissions,
            roles: rolesList
        });
    }

    _createModifiedObj = data => {
        const pm = [];
        let pf = [];
        const rawData = {
            _id: data._id,
            modules: data.modules,
            permissions: data.permissions
        };
        const modifiedRawData = rawData.modules && rawData.modules.map(module => {
            pf=[];
            let featureLength = module.features.length;
            if(featureLength > 0) {
                module.features.map(f => {
                    if(f) {
                        let permissions = [];
                        data.permissions.map( dp => {
                            permissions.push({
                                fieldName: dp.fieldName,
                                fieldValue: dp.fieldValue,
                                displayValue: dp.displayValue
                            });
                        });
                          let obj = {};
                          obj = { permissions, featureName: f };
                          if(obj) { pf.push(obj); }
                    }
                });
                pm.push({
                    moduleName: module.moduleName,
                    features: pf
                });
            } else {
                pm.push({
                    moduleName: module.moduleName,
                    features: []
                });
            }
           
            return pm;
        });
        this.setState({
            modifiedObj:  modifiedRawData && modifiedRawData[0]
        });
        
    }

    _cancelForm = () => {
        this.props.cancelForm();
    }

    _checkValidation = () => {
        const { roleName, roleDiscription, checkedBoxes } = this.state;
        const formStatus = rolePageValidation({ roleName, roleDiscription, checkedBoxes });
        this.setState({
          errors: formStatus.errors,
          isFormValid: formStatus.formIsValid
        });
        return formStatus.status;
    };

    _submitForm = () => {
        const status = this._checkValidation();
        const { roleName, roleDiscription, modifiedObj, postData, modules } = this.state;
        const { id } = this.props;
        const editModulesData = !postData ? postData : modules;
        const data = {
            roleName: roleName,
            roleDiscription: roleDiscription,
            modules: id ? editModulesData : modifiedObj
        };
        if(status) {
            this.props.submitForm(data);
        }
    }

    _checkboxChange = e => {
        const { id, checked } = e.target;
        let { checkedBoxes } = this.state;
        if(checked == true) { checkedBoxes.indexOf(id) === -1 ? checkedBoxes.push(id) : ''; }
        else if(checked == false) { checkedBoxes.indexOf(id) !== -1 ? checkedBoxes.splice(id, 1) : ''; }
        this.setState({
            checkedBoxes,
            errors: {}
        });
        const splitValue = id && id.split('_');
        let moduleName = splitValue[0] || '';
        let featureName = splitValue[1] || '';
        let fieldName = splitValue[2] || '';

        if(this.props.id) {
            const rawData = [ ...this.state.modules];
            rawData.map(m => {
                if(m.moduleName === moduleName) {
                    m.features.map(f => {
                        if(f.featureName === featureName) {
                            f.permissions.map(p => {
                                if(p.fieldName === fieldName) {
                                    p.displayValue = checked;
                                }
                            });
                        }
                    });
                }
            });
            this.setState({
                postData: rawData
            });
        } else {
            const rawData = [ ...this.state.modifiedObj ];
            let indexes=[];
    
            rawData.map( (m, i) => {
                if(m.moduleName === moduleName) {
                    indexes.push(i);
                    m.features.map( (f, j) => {
                        if(f.featureName === featureName) {
                            indexes.push(j);
                            f.permissions.map( (p, k) => {
                                if(p.fieldName === fieldName) {
                                    indexes.push(k);
                                }
                            });
                        }
                    });
                }
            });
            const mI = indexes[0];
            const fI = indexes[1];
            const pI = indexes[2];
            rawData[mI].features[fI].permissions[pI].displayValue = checked;
        }
    }

    _onFieldChange = e => {
        const { name, value } = e.target;
       
        let className = '';
        if(!value) {
            className = '';
        } else {
            className = 'on';
        }
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
            className: className,
            errors: {}
        }));
    }

    _buttonTabChanges = (e, btnTabName) => () => {
        this.setState(prevState => ({
            ...prevState,
            btnTabName: btnTabName,
            currentTabBtn: btnTabName
        }));
    }
    
    render() {
        const { roleName, roleDiscription, modules , permissions , currentTabBtn, checkedBoxes, btnTabName } = this.state;
        const { id } = this.props;
        const { errorRoleName, errorRoleDiscription, errorCheckedBoxes } = this.state.errors;
        let moduleData;
        if (id) {
            moduleData = modules && modules.map(module => {
                return module.moduleName === currentTabBtn ? module && module.features && module.features.map(feature => {
                    return (
                        <tr> <td>{ feature.featureName }</td> {
                            feature &&  feature.permissions && feature.permissions.map(permission => {
                                let id = `${module.moduleName}_${feature.featureName}_${permission.fieldName}`;
                                let checkStatus = permission.displayValue;
                                return <td>
                                     <input 
                                       name={ permission.fieldName } 
                                       id={ id }
                                       type='checkbox'
                                       value = { checkStatus }
                                       defaultChecked={ checkStatus }
                                       onChange={ this._checkboxChange }
                                     />
                                </td>;
                            })
                        }
                        </tr>
                    );
                }) : '';
            });
        } else {
            moduleData = modules && modules.map(module => {
                return module.moduleName === currentTabBtn ? module && module.features && module.features.map(feature => {
                    return (
                        <tr> <td>{ feature }</td> {
                            permissions && permissions.map(permission => {
                                let id = `${module.moduleName}_${feature}_${permission.fieldName}`;
                                let checkStatus = checkedBoxes.indexOf(id) !== -1 ? true : false;
                                return <td>
                                        <input 
                                          name={ permission.fieldName } 
                                          id={ id }
                                          type='checkbox'
                                          value = { checkStatus }
                                          defaultChecked={ checkStatus }
                                          onChange={ this._checkboxChange }
                                        />
                                </td>;
                            })
                        }
                        </tr>
                    );
                }) : '';
            });
        }
      
        return (
            <div className='content bg-content'>
                <div className='wrapper-addrole'>
                    <div className='wrapper-input'>
                        <div className='form-input-role'>   
                          <Input 
                            className='form-input' 
                            placeholder='Role Name' 
                            type='text' 
                            name='roleName'
                            maxlength="50"
                            value={ roleName }
                            textChange={ this._onFieldChange }
                          />
                          <div className="error">{ errorRoleName }</div>
                        </div>
                        
                        <div>
                          {/* <Input 
                            className='form-input' 
                            placeholder='Role Description' 
                            type='text' 
                            name='roleDiscription'
                            value={ roleDiscription }
                            textChange={ this._onFieldChange }
                          /> */}
                        <textarea 
                          rows="5"  cols="150"
                          className='form-textarea' 
                          placeholder='Role Description'
                          name='roleDiscription'
                          value={ roleDiscription }
                          onChange={ this._onFieldChange }
                          maxlength="250" >
                        </textarea>

                        <div className="error">{ errorRoleDiscription }</div>
                        </div>

                        <div className='btn-nav'>
                           {
                            modules && modules.map(button => {
                               return <Button name={ button.moduleName } className={ 'btn-roles ' + (btnTabName === button.moduleName ? 'active' : '') } onClick={ this._buttonTabChanges(this, button.moduleName) }/>;
                            })
                           }
                        </div>
                    </div>
                    <div className='table'>
                        <thead>
                            <th>Feature</th>
                            <th>Add</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>View</th>
                            <th>Import</th>
                            <th>Export</th>
                            <th>Print</th>
                            <th>Email</th>
                        </thead>
                        <tbody>
                        {
                            moduleData
                        }
                        </tbody>
                    </div>
                    <div className="row">
                        <div className="error">{ errorCheckedBoxes }</div>
                    </div>
                    <div className='btn-footer-group'>
                        <Button name='Cancel' type='button' className='btn-footer-cancel' onClick={ this._cancelForm }/>
                        <Button name='Submit' type='button' className='btn-footer-submit' onClick={ this._submitForm }/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddRoleComponent;