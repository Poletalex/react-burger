import { constructorReducer } from './burger-constructor';
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SORT_INGREDIENTS,
    CLEAR_INGREDIENTS
} from '../actions/burger-constructor';

describe('constructor reducer', () => {
    it('инициализация', () => {
        expect(constructorReducer(undefined, {})).toEqual({
            bun: null,
            notBun: []
        });
    });

    const bun = {
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

    const ingredient1 = {
        "_id": "643d69a5c3f7b9001cfa0942",
        "name": "Соус Spicy-X",
        "type": "sauce",
        "proteins": 30,
        "fat": 20,
        "carbohydrates": 40,
        "calories": 30,
        "price": 90,
        "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        "__v": 0
    };

    const ingredient2 = {
        "_id": "643d69a5c3f7b9001cfa0941",
        "name": "Биокотлета из марсианской Магнолии",
        "type": "main",
        "proteins": 420,
        "fat": 142,
        "carbohydrates": 242,
        "calories": 4242,
        "price": 424,
        "image": "https://code.s3.yandex.net/react/code/meat-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
        "__v": 0
    };

    describe('Добавление ингредиентов', () => {
        it('добавление булки', () => {
            expect(
                constructorReducer(undefined, {
                    type: ADD_INGREDIENT,
                    ingredient: bun
                })
            ).toEqual({
                bun,
                notBun: []
            });
        });

        it('добавление ингредиента, отличного от булки', () => {
            expect(
                constructorReducer(undefined, {
                    type: ADD_INGREDIENT,
                    ingredient: ingredient1
                })
            ).toEqual({
                bun: null,
                notBun: [ingredient1]
            });
        });
    });

    it('удаление ингредиента', () => {
        expect(
            constructorReducer({
                bun: bun,
                notBun: [ingredient1, ingredient2]
            }, {
                type: REMOVE_INGREDIENT,
                ingredient: ingredient1
            })
        ).toEqual({
            bun: bun,
            notBun: [ingredient2]
        });
    });     

    it('перемещение ингредиентов', () => {
        expect(
            constructorReducer({
                bun: bun,
                notBun: [ingredient1, ingredient2]
            }, {
                type: SORT_INGREDIENTS,
                dragIndex: 0,
                hoverIndex: 1
            })
        ).toEqual({
            bun: bun,
            notBun: [ingredient2, ingredient1]
        });
    });

    it('удаление всех ингредиентов', () => {
        expect(
            constructorReducer({
                bun: bun,
                notBun: [ingredient1, ingredient2]
            }, {
                type: CLEAR_INGREDIENTS
            })
        ).toEqual({
            bun: null,
            notBun: []
        });
    });
}); 