import { selectedIngredientReducer } from './selected-ingredient';
import {
    SELECT_INGREDIENT,
    CLEAR_SELECTED_INGREDIENT
} from '../actions/selected-ingredient';
import { data } from '../../../cypress/fixtures/burger-constructor/ingredients.json';
import { initialState } from './selected-ingredient';

describe('selected ingredient reducer', () => {
    it('инициализация', () => {
        expect(selectedIngredientReducer(undefined, {})).toEqual(initialState);
    });

    const ingredient = data[0];

    it('выбор ингредиента', () => {
        expect(selectedIngredientReducer(undefined, {
            type: SELECT_INGREDIENT,
            ingredient
        })).toEqual({
            ingredient
        });
    });

    it('очистка выбранного ингредиента', () => {
        expect(selectedIngredientReducer({
            ingredient
        }, {
            type: CLEAR_SELECTED_INGREDIENT,
            ingredient
        })).toEqual(initialState);
    });
});