import React, { useEffect, useCallback } from 'react';
import styles from './feed.module.css';
import { OrderCard } from '../../components/order/order-card.js/order-card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { connect, disconnect } from '../../services/actions/ws-feed';
import { BURGER_WSS, WebsocketStatus } from '../../utils/constants';
import { TOrder } from '../../utils/types';
import { selectOrder } from '../../services/slices/selected-order';

export const Feed = () => {
    const { wsMessage, status } = useAppSelector(store => store.wsFeed);
    const { orders, total, totalToday } = wsMessage || {};
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(connect(`${BURGER_WSS}orders/all`));

        return () => {
            if (status !== WebsocketStatus.OFFLINE) dispatch(disconnect());
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // колбэк получения номеров заказов с определенным статусом
    const getOrdersWithStatus = useCallback((status: string) => {
        const limit = 10;
        let stack: TOrder[] = [];
        return orders
            ?.reduce((arr: TOrder[][], nextOrder) => {
                if (nextOrder.status === status) {
                    stack.push(nextOrder);
                    // записываем колонку номеров в общий массив
                    if (stack.length === limit) {
                        arr.push(stack);
                        stack = [];
                    }
                }
                return arr;
            }, [])
            // отрисовка колонок номеров
            .map((nextColumn, index) => (
                <div
                    key={index}
                    className={styles.numbersColumn}>
                    {
                        nextColumn.map(nextOrder => (
                            <p
                                key={nextOrder._id}
                                className="text text_type_digits-default">
                                {nextOrder.number}
                            </p>
                        ))
                    }
                </div>
            ));
    }, [orders]);

    return (
        <div className={styles.main}>
            <div className={styles.orders}>
                <p className="text text_type_main-medium mt-10 mb-5">Лента заказов</p>
                <div className={styles.ordersBoard + ' pr-2'}>
                    {
                        orders?.map(nextOrder => (
                            <OrderCard
                                key={nextOrder._id}
                                data={nextOrder}
                                onClick={() => {
                                    dispatch(selectOrder(nextOrder));
                                }} />
                        ))
                    }
                </div>
            </div>
            <div className={styles.queue + ' pl-15'}>
                <div className={styles.numbers + ' mb-15'}>
                    <div className={styles.columns + ' mr-9'}>
                        <p className="text text_type_main-medium mb-6">Готовы:</p>
                        <div className={styles.done}>
                            {
                                getOrdersWithStatus('done')
                            }
                        </div>
                    </div>
                    <div className={styles.columns}>
                        <p className="text text_type_main-medium mb-6">В работе:</p>
                        <div className={styles.inWork}>
                            {
                                getOrdersWithStatus('pending')
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.total + ' mb-15'}>
                    <p className="text text_type_main-medium">
                        Выполнено за все время:
                    </p>
                    <p className="text text_type_digits-large">
                        {total}
                    </p>
                </div>
                <div className={styles.total}>
                    <p className="text text_type_main-medium">
                        Выполнено за сегодня:
                    </p>
                    <p className="text text_type_digits-large">
                        {totalToday}
                    </p>
                </div>
            </div>
        </div>
    );
};