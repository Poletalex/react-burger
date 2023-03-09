import React, {useState} from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientDetails } from '../modals/ingredient-details/ingredient-details';
import { dataType } from '../../utils/dataType';
import styles from './ingredient.module.css';

const Ingredient = ({ data }) => {
    const [showModal, setShow] = useState(false);

    return (
        <>
            <div className={styles.container + ' ml-4 mt-6 mb-10'}>
                <img
                    src={data.image}
                    alt={data.name}
                    className='ml-4 mb-1'
                    onClick={() => setShow(true)} />
                <Counter count={1} size="default" extraClass="m-1" />
                <div className={styles.price + ' mb-1'}>
                    <p className={styles.price + ' text text_type_digits-default pr-1'}>
                        {data.price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={styles.name + ' text text_type_main-default'}>
                    {data.name}
                </p>
            </div>
            {
                showModal && (
                    <>
                        <IngredientDetails
                            data={data}
                            header={'Хэдер'}
                            onClose={() => setShow(false)} />
                    </>
                )
            }
        </>
    );
};

Ingredient.propTypes = {
    data: dataType
};

export default Ingredient;