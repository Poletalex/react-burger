import { ingredientsReducer } from './ingredients';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../actions/ingredients';
import ingredients from '../../../cypress/fixtures/burger-constructor/ingredients.json';
import { initialState } from './ingredients';

describe('ingredients reducer', () => {
    it('инициализация', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState);
    });

    it('выполнение запроса', () => {
        expect(ingredientsReducer(undefined, {
            type: GET_INGREDIENTS_REQUEST
        })).toEqual({
            ...initialState,
            request: true,
            failed: false,
        });
    });

    it('запрос выполнен успешно', () => {
        expect(ingredientsReducer(undefined, {
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: ingredients.data
        })).toEqual({
            ...initialState,
            ingredients: ingredients.data,
            request: false
        });
    });

    it('запрос не выполнен', () => {
        expect(ingredientsReducer(undefined, {
            type: GET_INGREDIENTS_FAILED
        })).toEqual({
            ...initialState,
            failed: true,
            request: false
        });
    });
});