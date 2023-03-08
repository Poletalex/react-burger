import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById("react-modals");

export const Modal = props => {
    const { children, header, onClose } = props;
    return ReactDOM.createPortal(
        (
            <>
                <div className="Modal">
                    <p>{header}</p>
                    {children}
                    <button onClick={onClose}>Закрыть</button>
                </div>
            </>
        ),
        modalRoot
    );
}; 