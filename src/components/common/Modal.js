import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Modal = props => {
    const { title, modalBody, buttons, closeModal} = props;
    if(!props.isShowModal) {
        return null;
    }
    const buttonsData = buttons && buttons.map(button => {
       return <Button type="button" name={ button.name } className={ button.class } onClick={ button.onclick } />;
    });
    return (
        <div id="myModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    { title }
                    <span class="close" onClick={ closeModal }>&times;</span>
                 </div>
                 <hr className="modal-hr"/>
                <div class="modal-body">
                    <p>{ modalBody }</p>
                 </div>
                 <hr className="modal-hr"/>
                 <div class="modal-footer">
                       <div className="modal-btn-group">
                          { buttonsData }
                      </div>
                 </div>
            </div>
        </div>
    );
};


Modal.defaultProps = {
    title: 'Confirmation',
    btn1_name: 'Cancel',
    btn1_classname: 'btn-cancel',
    btn2_name: 'Ok',
    btn2_classname: 'btn-delete'
};

Modal.propTypes = {
    title: PropTypes.string,
    modalBody: PropTypes.string,
    btn1_name: PropTypes.string,
    btn1_classname: PropTypes.string,
    btn2_name: PropTypes.string,
    btn2_classname: PropTypes.string,
    closeModal: PropTypes.func,
    confirm: PropTypes.func
};

export default Modal;