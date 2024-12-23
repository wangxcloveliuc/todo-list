import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onConfirm} className="modal-confirm-button">Yes</button>
                    <button onClick={onClose} className="modal-cancel-button">No</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
