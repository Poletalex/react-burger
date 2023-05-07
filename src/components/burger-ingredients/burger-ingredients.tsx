import React, { useState, useMemo, useRef, useEffect, SyntheticEvent } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../ingredient/ingredient';
import styles from './burger-ingredients.module.css';
import { SELECT_INGREDIENT } from '../../services/actions/modal';
import { categories, getСategorizedData } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const BurgerIngredients = () => {
    const [activeTab, setTab] = useState(categories[0].title);

    const { ingredients } = useAppSelector(store => store.ingredients);

    const data = useMemo(() => getСategorizedData(ingredients), [ingredients]);
    const dispatch = useAppDispatch();

    const categoriesRef = useRef<any>();

    const handleScroll = (event: SyntheticEvent) => {
        if (categoriesRef.current) { 
            const parentTop = categoriesRef.current.getBoundingClientRect().top;
            if (event.currentTarget) { 
                const startDiff = Math.abs(event.currentTarget.children[0].getBoundingClientRect().top - parentTop);

                const { index } = Array.from(event.currentTarget.children).reduce((prev, curr, index) => {
                    const diff = Math.abs(parentTop - curr.getBoundingClientRect().top);
                    return diff < prev.diff ? { diff, index } : prev;
                }, { diff: startDiff, index: 0 });

                setTab(data[index].title);
            }            
        }        
    };

    // навигация по нажатию табов
    const tabsRef = useRef<any>([]);
    useEffect(() => {
        tabsRef.current[categories.findIndex(nextTab => nextTab.title === activeTab)]
            .scrollIntoView();
    }, [activeTab, tabsRef]);

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
                            active={activeTab === category.title}
                            onClick={setTab}>
                            {category.title}
                        </Tab>))
                }
            </div>
            <div
                ref={categoriesRef}
                className={styles.categories}
                onScroll={handleScroll}>
                {
                    data && data.map((category, index) => (
                        <div
                            ref={node => tabsRef.current[index] = node}
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
                                                dispatch({
                                                    type: SELECT_INGREDIENT,
                                                    ingredient: nextIngredient
                                                });
                                            }} />
                                    )
                                }
                            </div>
                        </div>))
                }
            </div>
        </div>
    );
};