import React, { FC, useMemo } from 'react';
import styles from './order-card.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { MAX_ORDER_INGREDIENTS } from '../../../utils/constants';
import { Link } from 'react-router-dom';
import { TIngredient, TOrder } from '../../../utils/types';
import { useIngredients } from '../../../hooks/useIngredients';

export const OrderCard: FC<TOrder> = ({ _id, name, ingredients: ingredientsNumbers, status, number, createdAt, updatedAt }) => {
    const { ingredients } = useIngredients(ingredientsNumbers);

    const reversedIngredients = useMemo<Array<TIngredient>>(() => {
        const reversed = ingredients;
        reversed.reverse();
        return reversed;
    }, [ingredients]);

    const price = ingredients.reduce((sum, nextItem) => sum + nextItem.price, 0);

    return (
        <Link
            key={_id}
            to={`/feed/${_id}`}
            className={styles.main + ' pr-6 pl-6 mb-4'}>
            <div className={styles.title + ' mt-6 mb-6'}>
                <p className="text text_type_digits-default">
                    #{number}
                </p>
                <p className="text text_type_main-default text_color_inactive mb-6">
                    <FormattedDate date={new Date(createdAt)} />
                </p>                
            </div>
            <p className="text text_type_main-medium mb-6">
                {name}
            </p>
            <div className={styles.footer + ' mb-6'}>
                <div className={styles.ingredients}>
                    {
                        reversedIngredients.map((nextItem, index) => {
                            if (index < MAX_ORDER_INGREDIENTS) {
                                const hasCounter = index === 0 && reversedIngredients.length > MAX_ORDER_INGREDIENTS;
                                return (
                                    <span
                                        key={nextItem._id}
                                        className={styles.circle}>
                                        <img
                                            src={nextItem.image}
                                            alt={nextItem._id}
                                            className={`${hasCounter ? styles.withCounter : ''}`} />
                                        {
                                            hasCounter &&
                                            (<p className={styles.counter + ' text text_type_main-default'}>
                                                +{reversedIngredients.length - MAX_ORDER_INGREDIENTS}
                                            </p>)
                                        }                                        
                                    </span>                                    
                                );
                            }
                            return null;
                        })
                    }
                </div>
                <div className={styles.price + ' ml-6'}>
                    <p className='text text_type_digits-default pr-1'>
                        {price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    );
};