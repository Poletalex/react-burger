import { selectedIngredientReducer } from './selected-ingredient';
import {
    SELECT_INGREDIENT,
    CLEAR_SELECTED_INGREDIENT
} from '../actions/selected-ingredient';

describe('selected ingredient reducer', () => {
    it('инициализация', () => {
        expect(selectedIngredientReducer(undefined, {})).toEqual({
            ingredient: null
        });
    });

    const ingredient = {
        "_id": "643d69a5c3f7b9001cfa093c",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0
    };

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
        })).toEqual({
            ingredient: null
        });
    });
});