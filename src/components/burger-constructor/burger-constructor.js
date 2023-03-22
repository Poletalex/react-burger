import React, { useState, useMemo, useReducer, useEffect } from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../modals/order-details/order-details';
import { Modal } from '../modals/modal/modal';
import styles from './burger-constructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INGREDIENT, SORT_INGREDIENTS } from '../../services/actions/burger-constructor';
import { createOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { DraggableIngredient } from '../burger-ingredients/draggable-ingredient/draggable-ingredient';

const reducer = (state, action) => {
    return action.data.reduce((sum, nextItem) => {
        const price = sum + nextItem.price;
        return nextItem.type === 'bun' ? price * 2 : price;
    }, 0);
};

export const BurgerConstructor = () => {
    const [showModal, setShow] = useState(false);
    const [totalPrice, dispatchPrice] = useReducer(reducer, 0);

    const data = useSelector(store => store.burgerConstructor.selected);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatchPrice({ data: data });
    }, [data]);

    const bun = useMemo(() => data.find(nextIngredient => nextIngredient.type === 'bun'), [data]);

    const [{ isHover }, dropRef] = useDrop({
        accept: 'ingredient',
        drop(item) {
            dispatch({
                type: ADD_INGREDIENT,
                ingredient: item.ingredient
            });
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    return (
        <div
            className={styles.container + ' pt-25 ' + (isHover ? styles.isHover : '')}
            ref={dropRef}>
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
            <div
                className={styles.list + ' pr-4'}>
                {
                    data.map(nextIngredient => (
                        nextIngredient.type !== 'bun' && 
                        <DraggableIngredient
                            key={nextIngredient._id + Math.random()}
                            data={nextIngredient} />))
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
                        dispatch(createOrder(data));
                    }}>
                    Оформить заказ
                </Button>
            </footer>
            {
                showModal && data.length > 0 && (
                    <Modal onClose={() => setShow(false)}>
                        <OrderDetails />
                    </Modal>
                )
            }
        </div>
    );
};