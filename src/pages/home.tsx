import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import styles from './home.module.css';
import { useAppSelector } from '../store/hooks';
import { TIngredientState } from '../utils/types';

export const HomePage = () => {
    const { ingredients } = useAppSelector<TIngredientState>(store => store.ingredients);

    return (
        <main className={styles.main}>
            {
                ingredients && (
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                )
            }
        </main>
    );    
};