import React, { useState, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../ingredient/ingredient';
import { Modal } from '../modals/modal/modal';
import { IngredientDetails } from '../modals/ingredient-details/ingredient-details';
import styles from './burger-ingredients.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INGREDIENT } from '../../services/actions/burger-constructor';

const categories = [
    {
        type: 'bun',
        title: 'Булки',
        data: []
    },
    {
        type: 'sauce',
        title: 'Соусы',
        data: []
    },
    {
        type: 'main',
        title: 'Начинки',
        data: []
    }
];

const getСategorizedData = data => {
    const categorizedData = JSON.parse(JSON.stringify(categories));

    if (data) { 
        data.forEach(nextIngredient => {
            const category = categorizedData.find(nextCat => nextCat.type === nextIngredient.type);
            if (category) {
                category.data.push(nextIngredient);
            }
        });
    }
    
    return categorizedData;
};

export const BurgerIngredients = () => {
    const [current, setCurrent] = useState(categories[0].title);
    const [showModal, setShow] = useState(false);
    const [currentIngredient, setIngredient] = useState(null);

    const { ingredients } = useSelector(store => store.ingredients);

    const data = useMemo(() => getСategorizedData(ingredients), [ingredients]);
    const dispatch = useDispatch();

    return (
        <div className={styles.container + ' mr-10'}>
            <p className={styles.title + ' text text_type_main-medium mt-10 mb-5'}>
                Соберите бургер
            </p>
            <div className={styles.tabs}>
                {
                    categories.map(category => (
                        <Tab
                            key={category.type}
                            value={category.title}
                            active={current === category.title}
                            onClick={setCurrent}>
                            {category.title}
                        </Tab>))
                }
            </div>
            <div className={styles.categories}>
                {
                    data && data.map(category => (
                        <div
                            key={category.type}
                            className={styles.category}>
                            <p className="text text_type_main-medium mt-10">
                                {category.title}
                            </p>
                            <div className={styles.ingredients}>
                                {
                                    category.data.map(nextIngredient =>
                                        <Ingredient
                                            key={nextIngredient._id}
                                            data={nextIngredient}
                                            onClick={() => {
                                                setShow(true);
                                                setIngredient(nextIngredient);
                                                dispatch({
                                                    type: ADD_INGREDIENT,
                                                    ingredient: nextIngredient
                                                });
                                            }} />
                                    )
                                }
                            </div>
                        </div>))
                }
            </div>
            {
                showModal && (
                    <Modal
                        header='Детали ингредиента'
                        onClose={() => setShow(false)} >
                        <IngredientDetails data={currentIngredient} />
                    </Modal>
                )
            }
        </div>
    );
};