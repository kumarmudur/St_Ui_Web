import React, { Component } from 'react';

//import { Input } from '../common';
//import { validateCSVFile } from '../../utils/commonValidation';
import { FILE_UPLOAD_SIZE, ICONS } from '../../constants';

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileError: '',
        };
    }

    _submitForm = file => {
        if (!file || file.size<=0 ) {
            this.setState({
                error: 'Please choose a file'
            });
        }
        else if(file) { 
            
            let fileExtension = file.name.split('.');
            fileExtension = fileExtension[fileExtension.length -1];
            
            if((fileExtension == 'csv' ) == false) {
                this.setState({error:'Invalid File Format. Please select file of extension .csv'});
            } else {
               this.props.fileUpload(file);    

            }
        }
        this.resetForm();
    }

    resetForm = () => {
        this.uploadFormRef.reset();
    }
    _fileChange = e => {
        let fileError = null;
        let target = e.target || e.srcElement;
        let file=null;
        if (target.value.length == 0) {

            file = null;
        } else {
            file = e.target.files[0];
        }

        let fileExtension = file.name.split('.');
        fileExtension = fileExtension[fileExtension.length -1];
        
        if((fileExtension == 'csv' ) == false) {
            fileError = 'Invalid File Format. Please upload .csv file';
        }
        if(file.size > FILE_UPLOAD_SIZE) {
            fileError = 'Please select less than 10mb file';
            
        }
        this.setState({
            fileName: file.name,
            error: fileError
        });
        if(!fileError && file) {
            this._submitForm(file);
        }
    }

    render() {
      return (
          <form enctype='multipart/form-data' ref={ (el) => this.uploadFormRef = el }>
              <div className='file-content'>
                      <div className='download-file'>
                          <a className='download-tag' target='_blank' href='http://insight.dev.schoolwires.com/HelpAssets/C2Assets/C2Files/C2ImportCalEventSample.csv'>DOWNLOAD SAMPLE FILE</a>
                      </div>
                      <input 
                        className='file-input' 
                        placeholder='Upload'
                        type='file'
                        name='file'
                        onChange={ this._fileChange }
                      />
                      <span className='upload-text'><img src={ ICONS.UPLOAD } width="20" height="20" alt="" /> UPLOAD</span>
                      <label className='custom-file-label' htmlFor='customFile'>
                        { this.state.fileName }
                      </label>
                      <p className='upload-csvfile'>Upload CSV File(Max 10MB)</p>
                      <span> {this.state.error ? this.state.error : ''} </span>
              </div>
              <div className='clear'></div>
          </form>
      );
    }
}

export default FileUpload;