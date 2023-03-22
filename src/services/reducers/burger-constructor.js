import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT
} from "../actions/burger-constructor";

const initialState = {
    selected: []
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) { 
        case ADD_INGREDIENT: { 
            return action.ingredient.type === 'bun' ?
                {
                    ...state,
                    selected: state.selected
                        .filter(nextIngredient => nextIngredient.type !== 'bun')
                        .concat(action.ingredient)
                } :
                {
                    ...state,
                    selected: state.selected.concat(action.ingredient)
                }
        }
        case REMOVE_INGREDIENT: { 
            return {
                ...state,
                selected: state.selected.filter(nextIngredient => nextIngredient._id !== action.ingredient._id)
            }
        }
        default: { 
            return state;
        }
    }
};