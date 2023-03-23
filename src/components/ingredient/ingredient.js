import React, { useMemo } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { dataType } from '../../utils/dataType';
import styles from './ingredient.module.css';
import { useDrag } from 'react-dnd/dist/hooks';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const makeSelectCount = () =>
    createSelector(
        store => store.burgerConstructor,
        (_, data) => data,
        ({ bun, notBun }, data) => [...notBun, bun]
            .filter(nextIngredient => nextIngredient && nextIngredient._id === data._id).length
    );

export const Ingredient = ({ data, onClick }) => {
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: {
            id: data._id,
            ingredient: data
        }
    });

    const selectCount = useMemo(makeSelectCount, []);
    const count = useSelector(store => selectCount(store, data));

    return (
        <div
            className={styles.container + ' ml-4 mt-6 mb-10'}
            ref={dragRef}>
            <img
                src={data.image}
                alt={data.name}
                className='ml-4 mb-1'
                onClick={onClick} />
            {
                count > 0 && (<Counter count={count} size="default" extraClass="m-1" />)
            }
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