import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import styles from './home.module.css';

export const HomePage = () => {
    const { ingredients } = useSelector(store => store.ingredients);

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