import React, { useEffect, FC } from 'react';
import styles from './order-details.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useIngredients } from '../../../hooks/useIngredients';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { connect } from '../../../services/actions/ws-feed';
import { BURGER_WSS } from '../../../utils/constants';
import { useLocation, useParams } from 'react-router-dom';
import { getOrderStatus, getTotalPrice } from '../../../utils/utils';

type TOrderDetails = {
    inModal?: boolean;
};

export const OrderDetails: FC<TOrderDetails> = ({inModal}) => {
    const location = useLocation();
    // разные стейты в зависимости от маршрута
    const { wsMessage } = useAppSelector(store =>
        location.pathname.startsWith('/feed') ? store.wsFeed : store.wsProfile);

    const { id } = useParams();
    const { orders } = wsMessage || {};
    const { order } = useAppSelector(store => {
        return { order: store.selectedOrder.order || orders?.find(nextOrder => nextOrder._id === id) };
    });    
    const { name, status, number, createdAt } = order || {};
    const dispatch = useAppDispatch();

    /* создание соединения по ws для запроса всех заказов, 
    в случае если перешли по прямой ссылке */
    useEffect(() => {
        if (!order) {
            dispatch(connect(`${BURGER_WSS}orders/all`));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const { ingredients } = useIngredients(order?.ingredients || []);
    const price = ingredients?.reduce(getTotalPrice, 0);

    return (
        order && status ? (
            <div className={`${styles.main} ${!inModal ? styles.withoutModal : ''}`}>
                <p className={styles.title + " text text_type_digits-default mb-10"}>
                    #{number}
                </p>
                <p className="text text_type_main-medium mb-3">
                    {name}
                </p>
                <p className={styles.status + " text text_type_main-default mb-15"}>
                    {getOrderStatus(status)}
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
                                            {nextItem.count} x {nextItem.price}
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
                        <FormattedDate date={new Date(createdAt + '')} />
                    </p>
                    <div className={styles.price}>
                        <p className='text text_type_digits-default pr-1'>
                            {price}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>) : null
    );
};