import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ onClose }) => {
    return (
        <div
            className={styles.container}
            onClick={onClose}
        />
    );
};

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
};