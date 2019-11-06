import React from 'react';
import PropTypes from 'prop-types';

const AlertModal = props => {
    const { modalBody, closeModal} = props;
    if(!props.isShowModal) {
        return null;
    }
    return (
        <div id="myModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close" onClick={ closeModal }>&times;</span>
                 </div>
                <div class="modal-body">
                    <p className="alert-para">{ modalBody }</p>
                 </div>
            </div>
        </div>
    );
};

AlertModal.propTypes = {
    modalBody: PropTypes.string,
    closeModal: PropTypes.func
};

export default AlertModal;