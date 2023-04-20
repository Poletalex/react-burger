import React from 'react';
import styles from './modal-overlay.module.css';

type TOverlay = {
    onClose: () => any;
};

export const ModalOverlay = ({ onClose }: TOverlay) => {
    return (
        <div
            className={styles.container}
            onClick={onClose}
        />
    );
};