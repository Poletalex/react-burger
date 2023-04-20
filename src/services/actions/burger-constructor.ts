import { v4 as uuid } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';

export const addIngredient = (item: any) => ({
    type: ADD_INGREDIENT,
    ingredient: {
        ...item.ingredient,
        uniqueId: uuid()
    }
});