import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';

const Ingredient = ({data}) => { 

    return (
        <div className={`${styles.container} ml-4 mt-6 mb-10`}>
            <div className={styles.main}>
                <img src={data.image} alt='' className='ml-4 mb-1'/>
            </div>
            <Counter count={1} size="default" extraClass="" />
            <p className={`${styles.name} text text_type_main-default`}>
                {data.name}
            </p>  
            
        </div>
    );
};

export default Ingredient;