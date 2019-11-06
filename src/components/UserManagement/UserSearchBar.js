import React, { Component, Fragment } from 'react';
import '../../styles/index.scss';
import Input from '../common/Input';
import { USER_MANAGEMENT, ICONS } from '../../constants';

class UserSearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            showCloseBtn: false,
            currentFeature: this.props.currentFeature || 'VIEW_USERS',
        };
    }
    componentWillReceiveProps(nextProps) {
      
      if(nextProps && nextProps.currentFeature && USER_MANAGEMENT[nextProps.currentFeature].SEARCH_IN !== USER_MANAGEMENT[this.state.currentFeature].SEARCH_IN ) {
          this.setState({
            searchText: '',
            currentFeature: nextProps.currentFeature,
          });
      }
      if(nextProps.clearSearch) {
          this._clearSearchText();
      }
    }
    _clickHandler = e => {
        const { clickHandler } = this.props;
        clickHandler(e.currentTarget.name);
    }
    _onBlurHandler = e => {
        const { search } = this.props;
        if(e.currentTarget.value) {
            search(e.currentTarget.id, e.currentTarget.value);
        }
    }
    _exportHandler = e => {
        this.props.export(e.currentTarget.id);
    }

    _onFieldChange = e => {
        const { value } = e.currentTarget;
        let showCloseBtn = false;
        if(value) {
            showCloseBtn = true;
        } else {
            showCloseBtn = false;
        }
       this.setState({
        searchText: value,
        showCloseBtn
       });
    }

    _onKeyPressed =  e => {
        const { search } = this.props;
        let code = e.keyCode || e.which;
        if(code === 13) {
            search(e.currentTarget.id, e.currentTarget.value);
        }
    }

    _clearSearchText = e => {
        const { search } = this.props;
        this.setState({
            searchText: '',
            showCloseBtn: false
        });
        if(e && e.currentTarget && e.currentTarget.id) {
            search(e.currentTarget.id, '');
        }
    }

    render() {
        let { currentFeature } = this.props;
        const { searchText, showCloseBtn } = this.state;
        currentFeature = currentFeature ? currentFeature : 'VIEW_USERS';
        return (
            <Fragment>
            { 
              currentFeature !== 'MANAGE_CONFIGURATION_FIELDS' &&  currentFeature !== 'VIEW_BULK_IMPORT' &&
              currentFeature !== 'BULK_IMPORT' && currentFeature !== 'ADD_USER' && currentFeature !== 'ADD_PRODUCT' &&
              currentFeature !== 'ADD_WAREHOUSE' && currentFeature !== 'ADD_SUPPLIER' && currentFeature !== 'ADD_PURCHASE_PLAN' &&
              currentFeature !== 'EDIT_USER' && currentFeature !== 'USER_DETAILS' && currentFeature !== 'VIEW_PRODUCT' && 
              currentFeature !== 'VIEW_WAREHOUSE' && currentFeature !== 'EDIT_WAREHOUSE' && currentFeature !== 'EDIT_PRODUCT' && currentFeature !== 'VIEW_WAREHOUSE' &&
              currentFeature !== 'VIEW_SUPPLIER' && currentFeature !== 'VIEW_PURCHASE_PLAN' && currentFeature !== 'EDIT_SUPPLIER' && currentFeature !== 'EDIT_PURCHASE_PLAN' &&
              currentFeature !== 'PROFILE' && currentFeature !== 'CHANGE_PASSWORD' && currentFeature !== 'EDIT_PROFILE' &&

                <div className="search-main">
                  <Input 
                    id={ USER_MANAGEMENT[currentFeature].SEARCH_IN }
                    placeholder='Search'
                    type="text"
                    className="input-search roundedCorner"
                    value={ searchText }
                    textChange={ this._onFieldChange }
                    onBlur={ this._onBlurHandler }
                    keyPress={ this._onKeyPressed }
                  />
                  <img className="image-search" src={ ICONS.SEARCH } width="16" alt="" title="Search" />
                </div>
            }
                {
                   showCloseBtn ? <img className="image-close" id={ USER_MANAGEMENT[currentFeature].NAME } src={ ICONS.CLOSE } width="16" alt="" title="Close" onClick={ this._clearSearchText }/> :  null
                }
                <div className="buttons-main">
                  { (currentFeature !== 'PROFILE' && currentFeature !== 'EDIT_PROFILE') && USER_MANAGEMENT[currentFeature].BUTTONS['ADD'] && USER_MANAGEMENT[currentFeature].BUTTONS['ADD'] !== '' && 
                    <input type="button" value={ USER_MANAGEMENT[currentFeature].BUTTONS['ADD'] } 
                      name={ USER_MANAGEMENT[currentFeature].BUTTONS['ADD_KEY'] }
                      className="btn-navadd roundedCorner"
                      onClick={ this._clickHandler } 
                    />
                  }
                        
                  { USER_MANAGEMENT[currentFeature].BUTTONS['EXPORT'] && USER_MANAGEMENT[currentFeature].BUTTONS['EXPORT'] !== '' && 
                    <input
                      id={ USER_MANAGEMENT[currentFeature].SEARCH_IN }
                      type="button" 
                      value={ USER_MANAGEMENT[currentFeature].BUTTONS['EXPORT'] } 
                      name={ USER_MANAGEMENT[currentFeature].BUTTONS.EXPORT } 
                      className="btn-navexport roundedCorner" 
                      onClick={ this._exportHandler } 
                    />
                  }
                </div>
                   
               
            </Fragment>
        );
    }
}

// UserSearchBar.defaultProps = {
//     navbarTitle: 'USERS'
// };

export default UserSearchBar;

