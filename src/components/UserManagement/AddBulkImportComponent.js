import React, { Component } from 'react';
// DropdownBox,
import { Radio , Button } from '../common';
//import { validateCSVFile } from '../../utils/commonValidation';
import { IMPORT_MODE } from '../../constants';
import FileUpload from './FileUpload';

class AddBulkImportComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filePath: '',
            file: '',
            uploadStatus: '',
            importMode: IMPORT_MODE.ADD_UPDATE,
            uploadValidation: false,
            fileError: ''
        };
    }

    _checkRadioValue = e => {
        const value  = e.target.value;
        this.setState({
            importMode: value
        });
    }

    handleFileUpload = (fileData) => {
         this.setState({
             file: fileData,
             uploadValidation: fileData ? true : false
         });
     
        }
     _clickHandler = () => {
        let { file, importMode } = this.state;
        if(!file) {
            this.setState({
                fileError: 'Please upload a file'
            });
        } else {
            this.props.submitForm(file, importMode);
        }
     }

    render() {
        const { fileError } = this.state;
        return (
            <div className='content bg-content'>
                <div className='wrapper-addbulkimport'>
                    <div className="row">
                        <div className="user-page-heading">Bulk Import</div>
                         <div className="clear"></div>
                    </div>  
                    <div className='radio-importmode' >
                        {/* <div className='radio-header'>Import Mode</div> */}
                        <div className='radio-btn-group' onChange={ this._checkRadioValue }>
                            <Radio type='radio' value={ IMPORT_MODE.ADD_UPDATE } checked='true' name='bulkimport' /><span>Add/Update</span>
                            <Radio type='radio' value={ IMPORT_MODE.REPLACE } name='bulkimport'/><span>Replace</span>
                        </div>
                    </div>
                    <div className='border-wrapper'></div>
                    <FileUpload fileUpload={ this.handleFileUpload } fileError={ fileError }/>
                    <div className='footer-bulkimport'>
                        <Button name='Submit' className='btn-footer-submit' onClick={ this._clickHandler } type='submit' />
                    </div>
                    <div className='clear'></div>
                </div>
            </div>
        );
    }
}

export default AddBulkImportComponent;

