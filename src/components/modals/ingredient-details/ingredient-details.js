import React from 'react';
import { Modal } from '../modal/modal';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ data, onClose }) => {
    return (
        <Modal
            header='Детали ингредиента'
            onClose={onClose}>
            <div className={styles.content}>
                <img
                    className='mb-4'
                    src={data.image_large}
                    alt={data.name} />
                <p className="text text_type_main-medium mb-8">
                    {data.name}
                </p>
                <div className={styles.info + ' mb-15'}>
                    {
                        [
                            ['Калории, ккал', data.calories],
                            ['Белки, г', data.proteins],
                            ['Жиры, г', data.fat],
                            ['Углеводы, г', data.carbohydrates]
                        ].map(([name, value]) => ( 
                            < div
                                key={name}
                                className={styles.param + ' mr-5'}>
                                <p className="text text_type_main-default text_color_inactive">
                                    { name }
                                </p>
                                <p className="text text_type_digits-default text_color_inactive">
                                    { value }
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Modal >
    );
};

IngredientDetails.propTypes = {
    onClose: PropTypes.func.isRequired
};