import React, {useState, useEffect} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import styles from './burger-ingredients.module.css';
import { data } from '../utils/data';

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

const getСategorizedData = () => {
    const categorizedData = JSON.parse(JSON.stringify(categories));
    
    data.forEach(nextIngredient => {
        const category = categorizedData.find(nextCat => nextCat.type === nextIngredient.type);
        if (category) { 
            category.data.push(nextIngredient);
        }        
    });
    return categorizedData;       
};

const BurgerIngredients = props => {
    const [current, setCurrent] = useState(categories[0]);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(getСategorizedData());
    }, []);

    return (
        <div className={styles.container + ' mr-10'}>
            <p className={styles.title + ' text text_type_main-medium mt-10 mb-5'}>
                Соберите бургер
            </p>
            <div className={styles.tabs}>
                {
                    categories.map(category =>
                        <Tab
                            key={category.type}
                            value={category.title}
                            active={current === category.title}
                            onClick={setCurrent}>
                            {category.title}
                        </Tab>)
                }
            </div>
            <div className={styles.categories}>
                {
                    data && data.map(category =>
                        <div
                            key={category.type}
                            className={styles.category}>
                            <p className="text text_type_main-default mt-10">
                                {category.title}
                            </p>
                            <div className={styles.ingredients}>
                                {
                                    category.data.map(nextIngredient =>
                                        <Ingredient
                                            key={nextIngredient._id}
                                            data={nextIngredient} />
                                    )
                                }
                            </div>
                        </div>)
                }
            </div>             
        </div>
    );
};

export default BurgerIngredients;