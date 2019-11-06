import React,{ Component, Fragment } from 'react';
import 'react-dropdown/style.css';
import Dropdown  from 'react-dropdown';
import '../../styles/index.scss';

class DropdownBox extends Component {

    render() {
        const { name, placeholder, onChangeSelect, options, selectedValue, disabled } = this.props;
        return (
            <Fragment>
                <Dropdown 
                  name={ name }
                  options={ options } 
                  placeholder={ placeholder } 
                  onChange={ onChangeSelect }
                  value={ selectedValue }
                  disabled={ disabled }
                />
            </Fragment>
        );
    }
}

export default DropdownBox;