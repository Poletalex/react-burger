import React, { FC, useMemo } from 'react';
import styles from './order-page.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useIngredients } from '../../../hooks/useIngredients';

export const OrderPage = (props:any) => {
    const { ingredients } = useIngredients(['']);
    const { order } = props;

    return (
        order && <div className={styles.main}>
            <p className={styles.title + " text text_type_digits-default mb-10"}>
                #{order._id}
            </p>
            <p className="text text_type_main-medium mb-3">
                {order.name}
            </p>
            <p className="text text_type_main-default mb-15">
                {order.status}
            </p>
            <p className="text text_type_main-medium mb-6">
                Состав:
            </p>
            <div className={styles.ingredients + ' mb-10 pr-6'}>
                {
                    ingredients?.map(nextItem => {
                        return (
                            <div
                                key={nextItem._id}
                                className={styles.ingredient + ' mb-4'}>
                                <span
                                    className={styles.circle + ' mr-4'}>
                                    <img
                                        src={nextItem.image}
                                        alt={nextItem._id} />
                                </span>
                                <p className={styles.name + " text text_type_main-default mr-4"}>
                                    {nextItem.name}
                                </p>
                                <div className={styles.price}>
                                    <p className='text text_type_digits-default pr-1'>
                                        {nextItem.price}
                                    </p>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className={styles.footer}>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(order.time)} />
                </p>
                <div className={styles.price}>
                    <p className='text text_type_digits-default pr-1'>
                        {order.price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};