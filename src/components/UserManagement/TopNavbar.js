import React, { Component, Fragment } from 'react';
import '../../styles/index.scss';

import LoginCheck from '../../containers/LoginCheck';
import UserSearchBar from './UserSearchBar';
//import SearchRoles from './SearchRoles';


class TopNavbar extends Component {

    _clickHandler = name => {
        const { clickHandler } = this.props;
        clickHandler(name);
    }
    _onBlurHandler = (searchIn, searchText) => {
        const { search } = this.props;
        let data = {};
        if(searchText) {
            data = {
                'textSearch': [searchText]
            };
        } else {
            data = {
                'textSearch': []
            };
        }
       
        search(searchIn, data);
    }
    _export = (exportMod) => {
        this.props.export(exportMod);
    }
    render() {
        const { navbarTitle, clearSearch } = this.props;
        return (
            <Fragment>
                {/* <span className="toggle-sidebar">&#9776;</span> */}
                <div className="topnavbar">
                <div className="title">{ navbarTitle }</div>
                <div className="group-element">
                    <UserSearchBar 
                      currentFeature={ this.props.currentFeature || '' } 
                      clickHandler={ this._clickHandler } 
                      search={ this._onBlurHandler } 
                      export={ this._export }
                      clearSearch={ clearSearch }
                    />
                    {/* <LoginCheck navigation={ this.props.navigate } /> */}
                </div>
                <div>
                    <LoginCheck navigation={ this.props.navigate } />
                </div>
               </div>
            </Fragment>
        );
    }
}

TopNavbar.defaultProps = {
    navbarTitle: 'USERS'
};

export default TopNavbar;

