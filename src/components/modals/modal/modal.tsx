import React, { useEffect, useCallback, ReactNode, FC } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

const modalRoot: any = document.getElementById("react-modals");

type TModal = {
    children: ReactNode;
    header?: string;
    onClose: () => any;
};

export const Modal:FC<TModal> = ({ children, header, onClose }) => {
    const escapeClose = useCallback((event: any) => {
        if (event.key === "Escape") {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', escapeClose);

        return () => {
            document.removeEventListener('keydown', escapeClose);
        };
    }, [escapeClose]);

    return ReactDOM.createPortal(
        (
            <div className={styles.modal}>
                <div className={styles.container}>
                    <header className={styles.header + ' ml-10 mr-10 mt-10'}>
                        <p className="text text_type_main-large">
                            {header}
                        </p>
                        <CloseIcon
                            type="primary"
                            onClick={onClose} />
                    </header>
                    {children}
                </div>
                <ModalOverlay onClose={onClose} />
            </div>            
        ),
        modalRoot
    );
}; 