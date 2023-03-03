import React, {useState} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

const tabs = [
    'Булки',
    'Соусы',
    'Начинки'
];

const BurgerIngredients = props => {
    const [current, setCurrent] = useState(tabs[0]);

    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium">
                Соберите бургер
            </p>
            <div className={styles.tabs}>
                {
                    tabs.map(nextTab =>
                        <Tab
                            key={nextTab}
                            value={nextTab}
                            active={current === { nextTab }}
                            onClick={setCurrent}>
                            {nextTab}
                        </Tab>)
                }
            </div>
            <main className={styles.ingredients}>

            </main>
        </div>
    );
};

export default BurgerIngredients;