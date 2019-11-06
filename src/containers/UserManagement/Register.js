import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { POST_REGISTER_DATA, SET_ALERT_STATUS } from '../../actions';
import RegisterComponent from '../../components/UserManagement/RegisterComponent';
import Modal from '../../components/common/Modal';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      shouldRedirect: false,
      isCloseModal: false,
      successMessage: ''
    };
  }

  componentWillReceiveProps(nextProps) {
      let { shouldRedirect } = this.state;
      const successCode = nextProps && nextProps.code;
      if(nextProps && nextProps.code) {
        if(successCode === 200) {
          shouldRedirect = true;
        }
        this.setState({
          shouldRedirect,
          successMessage: nextProps.message
        });
      }
  }

  _submitForm = (data) => {
    this.props.submitForm(data);
  }


  _closeModal = () => {
    const successCode = this.props && this.props.code;
    if(successCode === 200) {
      this.setState({
        isCloseModal: true
      });
    }
    this.props.setAlertStatus({ 'visible': false });
  }

  render() {
    const { isAlertVisible } = this.props;
    const { shouldRedirect, isCloseModal, successMessage } = this.state;
    if(shouldRedirect && isCloseModal ) {
      return <Redirect to={ '/activate' } />;
    }
    
    const buttonMeta = [
      {
          name: 'Ok',
          class: 'btn-delete',
          onclick: this._closeModal
      }
    ];

    return (
      <div>
        <RegisterComponent
          submitForm={ this._submitForm }
        />
        { successMessage && isAlertVisible && 
          <Modal 
            title="Message" 
            isShowModal={ isAlertVisible } 
            modalBody={ successMessage }
            closeModal={ this._closeModal }
            buttons={ buttonMeta }
          /> 
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { Register, AlertStatus } = state;
  return {
    message: Register.message,
    code: Register.code,
    RegisterDetails: Register.userDetails,
    isAlertVisible: AlertStatus.visible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitForm: ( data ) => {
      return dispatch({ type: POST_REGISTER_DATA, data });
    },
    setAlertStatus: data => {
        return dispatch({ type: SET_ALERT_STATUS, data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
