import React, { useMemo, useCallback, FC } from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../modals/order-create-details/order-create-details';
import { Modal } from '../modals/modal/modal';
import styles from './burger-constructor.module.css';
import { addIngredient } from '../../services/actions/burger-constructor';
import { createOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { DraggableIngredient } from './draggable-ingredient/draggable-ingredient';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../loader/loader';
import { TDragged } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearOrderNum } from '../../services/slices/order';

export const BurgerConstructor: FC = () => {
    const { bun, notBun } = useAppSelector(store => store.burgerConstructor);
    const fullData = useMemo(() => [...notBun, bun, bun].filter(nextItem => nextItem), [bun, notBun]);

    const totalPrice = useMemo(() => fullData.reduce((sum, nextItem) => nextItem ?
        sum + nextItem.price : sum, 0), [fullData]);

    const dispatch = useAppDispatch();

    const { orderNum, status } = useAppSelector(store => store.order);

    const [{ isHover }, dropRef] = useDrop({
        accept: 'ingredient',
        drop(item: TDragged) {
            dispatch(addIngredient(item.ingredient));
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const { user } = useAppSelector(store => store.user);
    const navigate = useNavigate();
    
    const createOrderHandler = useCallback(() => {
        user ? dispatch(createOrder(fullData)) : navigate('/login');
    }, [user, dispatch, fullData, navigate]);

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
                    notBun.map((nextIngredient, index) => (
                        <DraggableIngredient
                            key={nextIngredient.uniqueId}
                            index={index}
                            data={nextIngredient}
                        />))
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
                {
                    bun ?
                        (<Button
                            htmlType="button"
                            type="primary"
                            size="medium"
                            onClick={createOrderHandler}>
                            Оформить заказ
                        </Button>) :
                        (<p className="text text_type_main-medium">Не хватает булок для заказа</p>)
                }
            </footer>
            {
                (status !== 'idle' || orderNum) && (
                    <Modal onClose={() => dispatch(clearOrderNum())}>
                        {
                            status === 'loading' ? (<Loader />) : orderNum && (<OrderDetails orderNum={orderNum} />)
                        }
                    </Modal>
                )
            }
        </div>
    );
};