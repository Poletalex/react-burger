import { TIngredientState } from '../../utils/types';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../actions/ingredients';

const initialState: TIngredientState = {
    ingredients: null,
    request: false,
    failed: false
};

export const ingredientsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                request: true,
                failed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                request: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                failed: true,
                request: false
            };
        }
        default: {
            return state
        }
    }
}; 