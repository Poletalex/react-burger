import { BUN } from "../../utils/constants";
import {
    ADD_INGREDIENT,
    CLEAR_INGREDIENTS,
    REMOVE_INGREDIENT,
    SORT_INGREDIENTS
} from "../actions/burger-constructor";
import { v4 as uuid } from 'uuid';

const initialState = {
    bun: null,
    notBun: []
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) { 
        case ADD_INGREDIENT: { 
            return action.ingredient.type === BUN ?
                {
                    ...state,
                    bun: action.ingredient
                } :
                {
                    ...state,
                    notBun: state.notBun.concat({
                        ...action.ingredient,
                        uniqueId: uuid()
                    })
                };
        }
        case REMOVE_INGREDIENT: { 
            const index = state.notBun.indexOf(action.ingredient);
            const newArr = [...state.notBun];
            newArr.splice(index, 1);
            return {
                ...state,
                notBun: newArr
            };
        }
        case SORT_INGREDIENTS: { 
            const newArr = [...state.notBun];
            const dragItem = newArr[action.dragIndex];
            newArr.splice(action.dragIndex, 1);
            newArr.splice(action.hoverIndex, 0, dragItem);
            return {
                ...state,
                notBun: newArr
            };
        }
        case CLEAR_INGREDIENTS: { 
            return initialState;
        }
        default: { 
            return state;
        }
    }
};