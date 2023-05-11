import { v4 as uuid } from 'uuid';
import { TIngredient } from '../../utils/types';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';

type TAddIngredient = {
    readonly type: typeof ADD_INGREDIENT;   
    readonly ingredient: TIngredient;
};
type TRemoveIngredient = {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly ingredient: TIngredient;
};
type TSortIngredient = {
    readonly type: typeof SORT_INGREDIENTS;
    readonly dragIndex: number;
    readonly hoverIndex: number;
};
type TClearIngredient = {
    readonly type: typeof CLEAR_INGREDIENTS;
};

export type TBurgerConstructorActions =
    TAddIngredient |
    TRemoveIngredient |
    TSortIngredient |
    TClearIngredient;

export const addIngredient = (item: TIngredient) => ({
    type: ADD_INGREDIENT,
    ingredient: {
        ...item,
        uniqueId: uuid()
    }
});