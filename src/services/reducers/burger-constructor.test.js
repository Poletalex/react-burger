import { constructorReducer } from './burger-constructor';
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SORT_INGREDIENTS,
    CLEAR_INGREDIENTS
} from '../actions/burger-constructor';
import { initialState } from './burger-constructor';
import { data } from '../../../cypress/fixtures/burger-constructor/ingredients.json';
import { Category } from '../../utils/constants';

describe('constructor reducer', () => {
    it('инициализация', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState);
    });

    const bun = data.find(item => item.type === Category.BUN);
    const ingredient1 = data.find(item => item.type === Category.SAUCE);
    const ingredient2 = data.find(item => item.type === Category.MAIN);

    describe('Добавление ингредиентов', () => {
        it('добавление булки', () => {
            expect(
                constructorReducer(undefined, {
                    type: ADD_INGREDIENT,
                    ingredient: bun
                })
            ).toEqual({
                ...initialState,                
                bun
            });
        });

        it('добавление ингредиента, отличного от булки', () => {
            expect(
                constructorReducer(undefined, {
                    type: ADD_INGREDIENT,
                    ingredient: ingredient1
                })
            ).toEqual({
                ...initialState,
                notBun: [ingredient1]
            });
        });
    });

    it('удаление ингредиента', () => {
        expect(
            constructorReducer({
                bun,
                notBun: [ingredient1, ingredient2]
            }, {
                type: REMOVE_INGREDIENT,
                ingredient: ingredient1
            })
        ).toEqual({
            bun,
            notBun: [ingredient2]
        });
    });     

    it('перемещение ингредиентов', () => {
        expect(
            constructorReducer({
                bun,
                notBun: [ingredient1, ingredient2]
            }, {
                type: SORT_INGREDIENTS,
                dragIndex: 0,
                hoverIndex: 1
            })
        ).toEqual({
            bun,
            notBun: [ingredient2, ingredient1]
        });
    });

    it('удаление всех ингредиентов', () => {
        expect(
            constructorReducer({
                bun,
                notBun: [ingredient1, ingredient2]
            }, {
                type: CLEAR_INGREDIENTS
            })
        ).toEqual(initialState);
    });
}); 