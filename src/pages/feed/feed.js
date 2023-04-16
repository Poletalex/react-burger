import React, { useMemo } from 'react';
import styles from './feed.module.css';
import { useSelector } from 'react-redux';
import { OrderCard } from '../../components/order/order-card.js/order-card';

export const Feed = (props) => {
    const { ingredients } = useSelector(store => store.ingredients);


    const ordersList = useMemo(() => ingredients && [
        {
            id: '034535',
            time: '2022-10-10T17:33:32.877Z',
            name: 'Death Star Starship Main бургер',
            ingredients: [ingredients[0], ingredients[1], ingredients[2], ingredients[3]],
            price: 480
        },
        {
            id: '034534',
            time: '2022-10-10T17:33:32.877Z',
            name: 'Interstellar бургер',
            ingredients: [ingredients[2], ingredients[3], ingredients[0]],
            price: 560
        }
    ], [ingredients]);

    return (
        <>
            
            <div className={styles.main}>
                <div className={styles.orders + ' mr-15'}>
                    <p className={styles.title + " text text_type_main-medium mt-10 mb-5"}>Лента заказов</p>
                    {
                        ingredients && ordersList.map(nextOrder => (
                            <OrderCard
                                key={nextOrder.id}
                                {...nextOrder} />
                        ))
                    }
                </div>
                <div className={styles.queue}>
                    <div className={styles.numbers + ' mb-15'}>
                        <div className={styles.column + ' mr-9'}>
                            <p className="text text_type_main-medium mb-6">Готовы:</p>
                            <div className={styles.list}>
                                {
                                    ['034533', '034532'].map(nextNum => (
                                        <p
                                            key={nextNum}
                                            className="text text_type_digits-default">
                                            {nextNum}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={styles.column}>
                            <p className="text text_type_main-medium mb-6">В работе:</p>
                            <div className={styles.list}>
                                {
                                    ['034538', '034541'].map(nextNum => (
                                        <p
                                            key={nextNum}
                                            className="text text_type_digits-default">
                                            {nextNum}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.total + ' mb-15'}>
                        <p className="text text_type_main-medium">
                            Выполнено за все время:
                        </p>
                        <p className="text text_type_digits-large">
                            28 752
                        </p>

                    </div>
                    <div className={styles.total}>
                        <p className="text text_type_main-medium">
                            Выполнено за сегодня:
                        </p>
                        <p className="text text_type_digits-large">
                            138
                        </p>
                    </div>
                </div>
            </div>
        </>        
    );
};