import React, { useState, useMemo, useContext, useReducer, useEffect } from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../modals/order-details/order-details';
import { Modal } from '../modals/modal/modal';
import { IngredientsContext } from '../app/app';
import styles from './burger-constructor.module.css';

const reducer = (state, action) => {
    return action.data.reduce((sum, nextItem) => {
        const price = sum + nextItem.price;
        return nextItem.type === 'bun' ? price * 2 : price;
    }, 0);
};

export const BurgerConstructor = () => {
    const [showModal, setShow] = useState(false);
    const [orderId, setOrderId] = useState();
    const { data } = useContext(IngredientsContext);
    const [totalPrice, dispatchPrice] = useReducer(reducer, 0);

    useEffect(() => {
        dispatchPrice({data: data});
    }, [data]);

    const createOrder = async () => {
        try {
            if (data.length > 0) {
                const res = await fetch('https://norma.nomoreparties.space/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify({
                        "ingredients": data.map(nextIngredient => nextIngredient._id)
                    })
                });
                if (res.ok) {
                    const { order } = await res.json();
                    setOrderId(order.number);
                } else {
                    throw new Error(`Ошибка ${res.status}`)
                }
            }            
        } catch (err) {
            console.log(err.message);
        };
    };

    const bun = useMemo(() => data.find(nextIngredient => nextIngredient.type === 'bun'), [data]);

    return (
        <div className={styles.container + ' pt-25'}>
            {
                bun &&
                <div className={styles.elementTop + ' pl-8'}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + ' (верх)'}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            }
            <div className={styles.list + ' pr-4'}>
                {
                    data.map(nextIngredient => (
                        nextIngredient.type !== 'bun' &&
                        <div
                            key={nextIngredient._id}
                            className={styles.element}>
                            <div className={styles.dragIcon}>
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement
                                type=""
                                isLocked={false}
                                text={nextIngredient.name}
                                price={nextIngredient.price}
                                thumbnail={nextIngredient.image}
                            />
                        </div>))
                }
            </div>
            {
                bun &&
                <div className={styles.elementBottom + ' pl-8'}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + ' (низ)'}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            }
            <footer className={styles.footer + ' mt-10'}>
                <div className={styles.price + ' mr-10'}>
                    <p className="text text_type_digits-medium pr-1">
                        {totalPrice}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={() => {
                        setShow(true);
                        createOrder();
                    }}>
                    Оформить заказ
                </Button>
            </footer>
            {
                showModal && orderId && data.length > 0 && (
                    <Modal onClose={() => setShow(false)}>
                        <OrderDetails orderId={orderId} />
                    </Modal>
                )
            }
        </div>
    );
};