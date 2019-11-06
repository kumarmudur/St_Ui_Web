import React, { Component } from 'react';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileError: '',
        };
    }

    _submitForm = file => {
        let fileError = null;
        if (!file || file.size<=0 ) {
            fileError = 'Please select a image';
        }
        else if(file) { 
            let checkfileExtension = file.name.match(/\.(jpg|jpeg|png|gif)$/);
            if(!checkfileExtension) {
                fileError = 'Invalid Image Format. Please select image with proper format';
            } else {
               this.props.imageUpload(file);    
            }
        }
        this.setState({
            error: fileError
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
        if (target.value.length == 0) {
            file = null;
        } else {
            file = e.target.files[0];
        }

        if(file) {
            let checkfileExtension = file.name.match(/\.(jpg|jpeg|png|gif)$/);
            if(!checkfileExtension) {
                this.setState({error:'Please select image with (jpg | jpeg | png) format'});
            }
            else {
                this.props.imageUpload(file); 
            } 
        }
        this.setState({
            error: fileError
        });
        if(!fileError && file) {
            this._submitForm(file);  
        }
    }

    render() {
      return (
          <form enctype='multipart/form-data' ref={ (el) => this.uploadFormRef = el }> { /* eslint-disable-line */}
              <div className='file-content'>
                    <input 
                      type='file'
                      name='file'
                      title='Upload profile image'
                      onChange={ this._fileChange }
                      accept="image/x-png,image/gif,image/jpeg"
                    />
              </div>
              <span className="error image-error"> {this.state.error ? this.state.error : ''} </span>
              <div className='clear'></div>
          </form>
      );
    }
}

export default ImageUpload;