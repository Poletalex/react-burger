import { v4 as uuid } from 'uuid';
import { TIngredient } from '../../utils/types';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';

export const addIngredient = (item: TIngredient) => ({
    type: ADD_INGREDIENT,
    ingredient: {
        ...item,
        uniqueId: uuid()
    }
});