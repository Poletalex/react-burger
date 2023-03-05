import React from 'react';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { dataType } from '../utils/dataType';
import styles from './burger-constructor.module.css';

const BurgerConstructor = ({data}) => {
    const price = 610;
    return (
        <div className={styles.container + ' pt-25'}>
            <div className={styles.list + ' mb-10'}>
                {
                    data.map(nextIngredient =>
                        <div
                            key={nextIngredient._id}
                            className={styles.element}>
                            <div className={styles.dragIcon}>
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement
                                type=""
                                isLocked={true}
                                text={nextIngredient.name}
                                price={nextIngredient.price}
                                thumbnail={nextIngredient.image}
                            />
                        </div>)
                }
            </div>
            <footer className={styles.footer + ' '}>
                <div className={styles.price + ' mr-10'}>
                    <p className="text text_type_main-large pr-1">
                        {price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </footer>
        </div>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataType)
};

export default BurgerConstructor;