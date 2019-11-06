import React, { Component } from 'react';
import { ICONS, ADMIN_USER } from '../../constants';

class AssociateDocumentUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileError: '',
            files: {
                insurance: '',
                drivingLicense: '',
                SH4: '',
                SSN: ''
            }
        };
    }

    _submitForm = (files, file) => {
        let fileError = null;
        if (!file || file.size<=0 ) {
            fileError = 'Please select a file';
        }
        else if(file) {
            let checkfileExtension = file.name.match(/\.(jpg|jpeg|png|pdf)$/);
            if(!checkfileExtension) {
                fileError = 'Invalid file Format. Please select file with proper format';
            } 
            if(file.size > ADMIN_USER.ASSOCIATE_FILE_UPLOAD_SIZE) {
                fileError = ADMIN_USER.FILE_UPLOAD_SIZE_MSG;
            }
        }
        this.setState({
            error: fileError,
            files
        });
        this.resetForm();
    }

    resetForm = () => {
        this.uploadFormRef.reset();
    }

    _fileChange = e => {
        let fileError = null;
        let target = e.target || e.srcElement;
        let file=null;
        let fileType = null;
        if (target.value.length === 0) {
            file = null;
            fileType = null;
        } else {
            file = e.target.files[0];
            fileType = e.currentTarget.title;
        }

        if(file) {
            let checkfileExtension = file.name.match(/\.(jpg|jpeg|png|pdf)$/);
            if(!checkfileExtension) {
                fileError = 'Please select image with (jpg | jpeg | png | pdf) format';
            }
            let { files } = this.state;
            files[fileType] = file;
            if(!fileError && file) {
                this._submitForm(files, file); 
                return {
                    file,
                    fileType
                }; 
            }
        }
    }

    _removeFile = e => {
        let fileType = e.currentTarget.title;
        let { files } = this.state;
        files[fileType] = '';
        this.setState({
            files
        });
        return {
            fileType
        }; 
    }

    _addRemovefiles = e => {
        const event = e;
        let fileDetails = '';
        let idName ='';
        const { id } = e.currentTarget;
        if(id.includes('-') === true) {
            let indexValue = id && id.split('-');
            idName = indexValue && indexValue[0]; 
        }
        else {
            idName = id;
        }
        // trigger _fileChange and _removeFile functions based on type.
        if(idName === 'addfile') {
            fileDetails = this._fileChange(event);
        }
        else {
            fileDetails = this._removeFile(event);  
        }  
        let { file, fileType} = fileDetails;
        if(!file) {
           file = {};
        }
        this.props.fileUpload(file, fileType);
    }
    render() {
        const { type, docType } = this.props;
       const { error } = this.state;
        const  { insurance, drivingLicense, SH4, SSN } = this.state.files;
        const insurancePlaceHolderText = insurance && insurance.name ? insurance.name : 'Upload Insurance Copy';
        const drivingLicensePlaceHolderText = drivingLicense && drivingLicense.name ? drivingLicense.name : 'Upload Driver License Copy';
        const sh4FormPlaceHolderText = SH4 && SH4.name ? SH4.name : 'Upload Form W-9 Copy';
        const ssnPlaceHolderText = SSN && SSN.name ? SSN.name : 'Upload FEIN / SSN Copy';
        return (
            <form enctype='multipart/form-data' ref={ (el) => this.uploadFormRef = el }> { /* eslint-disable-line */}
                <div className='multi-file-content'>
                    { type === 'ADD' && 
                        <div className="row">
                            <div className="row text-alignment field-padding border-separator">
                                <div className="heading-tabs">Documents</div>
                                <div className="clear"></div>
                            </div>
                        </div>
                    }
                    <div>
                        <div className="row">
                            { (type === 'ADD' || docType === 'insurance') &&
                                <div className="cols fileupload-col-width">
                                    { type === 'ADD' && <span>INSURANCE<br /></span> }
                                    <div className="docupload">
                                        <div className={ `upload-btn-wrapper ${  insurance.name ? 'disable-upload' : '' }` }>
                                            <span className="btn-wrapper"><button className="btn"><img src={ ICONS.UPLOAD } width="15" height="18" alt="" />{ insurancePlaceHolderText } </button></span>
                                            <input 
                                              type='file'
                                              name='file'
                                              title='insurance'
                                              id='addfile-0'
                                              onChange={ this._addRemovefiles }
                                              accept="image/x-png,image/jpeg,application/pdf"
                                            />
                                        </div>
                                        { insurance.name && (
                                        <div className="delete">
                                            <img title="insurance" src={ ICONS.DELETE } width="20" id="removeInsurance" onClick={ this._addRemovefiles }/>
                                        </div> )}
                                    </div>
                                </div>
                            }
                            { (type === 'ADD' || docType === 'drivingLicense') &&
                                <div className="cols fileupload-col-width">
                                    { type === 'ADD' && <span>DRIVER LICENSE<br /></span> }
                                    <div className="docupload">
                                        <div className={ `upload-btn-wrapper ${  drivingLicense.name ? 'disable-upload' : '' }` }>
                                            <span className="btn-wrapper"><button className="btn"><img src={ ICONS.UPLOAD } width="15" height="18" alt="" />{ drivingLicensePlaceHolderText }</button></span>
                                            <input 
                                              type='file'
                                              name='file'
                                              title='drivingLicense'
                                              id='addfile-1'
                                              onChange={ this._addRemovefiles }
                                              accept="image/x-png,image/jpeg,application/pdf"
                                            />
                                        </div>
                                        { drivingLicense.name && (
                                        <div className="delete">
                                            <img title="drivingLicense" src={ ICONS.DELETE } width="20" id="removeDl" onClick={ this._addRemovefiles }/>
                                        </div> )}
                                    </div>
                                </div>
                            }
                            { (type === 'ADD' || docType === 'SH4') &&
                                <div className="cols fileupload-col-width">
                                    { type === 'ADD' && <span>FORM W-9<br /></span> }
                                    <div className="docupload">
                                        <div className={ `upload-btn-wrapper ${  SH4.name ? 'disable-upload' : '' }` }>
                                            <span className="btn-wrapper"><button className="btn"><img src={ ICONS.UPLOAD } width="15" height="18" alt="" />{ sh4FormPlaceHolderText } </button></span>
                                            <input 
                                              type='file'
                                              name='file'
                                              title='SH4'
                                              id='addfile-2'
                                              onChange={ this._addRemovefiles }
                                              accept="image/x-png,image/jpeg,application/pdf"
                                            />
                                        </div>
                                        { SH4.name && (
                                        <div className="delete">
                                            <img title="SH4" src={ ICONS.DELETE } width="20" id="removeSh4" onClick={ this._addRemovefiles }/>
                                        </div> )}
                                    </div>
                                </div> 
                            }
                            { (type === 'ADD' || docType === 'SSN') &&
                                <div className="cols fileupload-col-width">
                                    { type === 'ADD' && <span>FEIN / SSN<br /></span> }
                                    <div className="docupload">
                                        <div className={ `upload-btn-wrapper ${  SSN.name ? 'disable-upload' : '' }` }>
                                            <span className="btn-wrapper"><button className="btn"><img src={ ICONS.UPLOAD } width="15" height="18" alt="" />{ ssnPlaceHolderText }</button></span>
                                            <input 
                                              type='file'
                                              name='file'
                                              title='SSN'
                                              id='addfile-3'
                                              onChange={ this._addRemovefiles }
                                              accept="image/x-png,image/jpeg,application/pdf"
                                            />
                                        </div>
                                        { SSN.name && (
                                        <div className="delete">
                                            <img title="SSN" src={ ICONS.DELETE } width="20" id="removeSsn" onClick={ this._addRemovefiles }/>
                                        </div> )}
                                    </div>
                                </div> 
                            }   
                        </div>
                        { error && 
                            <div className="row">
                                <span className="error file-error"> { error ? error : ''} </span>
                            </div>
                        }
                    </div>
                </div>  
            </form>
        );
    }
}

export default AssociateDocumentUpload;