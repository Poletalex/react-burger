import {
    SELECT_INGREDIENT,
    CLOSE_INGREDIENT_MODAL
} from '../actions/modal';

const initialState = {
    ingredient: null
};

export const modalReducer = (state = initialState, action: any) => {
    switch (action.type) { 
        case SELECT_INGREDIENT: { 
            return { ingredient: action.ingredient };
        }
        case CLOSE_INGREDIENT_MODAL: { 
            return { ingredient: null };
        }
        default: { 
            return state;
        }
    }
};