import React from 'react';
import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { TIngredientState } from '../../../utils/types';

export const IngredientDetails = () => {
    const { ingredient } = useAppSelector(store => store.selectedIngredient);
    const { ingredients } = useAppSelector<TIngredientState>(store => store.ingredients);
    const { ingredientId } = useParams(); 
    const currentIngredient = ingredient || ingredients?.find(nextIngredient => nextIngredient._id === ingredientId);

    return currentIngredient ? (
        <div className={styles.content}>
            <img
                className='mb-4'
                src={currentIngredient.image_large}
                alt={currentIngredient.name} />
            <p className="text text_type_main-medium mb-8">
                {currentIngredient.name}
            </p>
            <div className={styles.info + ' mb-15'}>
                {
                    [
                        ['Калории, ккал', currentIngredient.calories],
                        ['Белки, г', currentIngredient.proteins],
                        ['Жиры, г', currentIngredient.fat],
                        ['Углеводы, г', currentIngredient.carbohydrates]
                    ].map(([name, value]) => (
                        < div
                            key={name}
                            className={styles.param + ' mr-5'}>
                            <p className="text text_type_main-default text_color_inactive">
                                {name}
                            </p>
                            <p className="text text_type_digits-default text_color_inactive">
                                {value}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    ) : null;
};