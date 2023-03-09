import React from 'react';
import { Modal } from '../modal/modal';
import PropTypes from 'prop-types';
import doneIcon from '../../../images/done.svg';
import styles from './order-details.module.css';

export const OrderDetails = ({ orderId, onClose }) => {
    return (
        <Modal
            onClose={onClose}>
            <div className={styles.content}>
                <p className={styles.order + " text text_type_digits-large mb-8"}>
                    {orderId}
                </p>
                <p className="text text_type_main-medium">
                    идентификатор заказа
                </p>
                <img
                    className='mt-15 mb-15'
                    src={doneIcon}
                    alt='done' />
                <p className="text text_type_main-default mb-2">
                    Ваш заказ начали готовить
                </p>    
                <p className="text text_type_main-default text_color_inactive mb-30">
                    Дождитесь готовности на орбитальной станции
                </p> 
            </div>
        </Modal >
    );
};

OrderDetails.propTypes = {
    orderId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};