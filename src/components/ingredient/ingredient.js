import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { dataType } from '../../utils/dataType';
import styles from './ingredient.module.css';

export const Ingredient = ({ data, onClick }) => {
    return (
        <div className={styles.container + ' ml-4 mt-6 mb-10'}>
            <img
                src={data.image}
                alt={data.name}
                className='ml-4 mb-1'
                onClick={onClick} />
            <Counter count={1} size="default" extraClass="m-1" />
            <div className={styles.price + ' mb-1'}>
                <p className={styles.price + ' text text_type_digits-default pr-1'}>
                    {data.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles.name + ' text text_type_main-default'}>
                {data.name}
            </p>
        </div>
    );
};

Ingredient.propTypes = {
    data: dataType,
    onClick: PropTypes.func.isRequired
};