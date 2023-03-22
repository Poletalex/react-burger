import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SORT_INGREDIENTS
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
                };
        }
        case REMOVE_INGREDIENT: { 
            const index = state.selected.indexOf(action.ingredient);
            const newArr = [...state.selected];
            newArr.splice(index, 1);
            return {
                ...state,
                selected: newArr
            };
        }
        case SORT_INGREDIENTS: { 
            const newArr = [...state.selected];
            const dragItem = newArr[action.dragIndex];
            newArr.splice(action.dragIndex, 1);
            newArr.splice(action.hoverIndex, 0, dragItem);
            return {
                ...state,
                selected: newArr
            };
        }
        default: { 
            return state;
        }
    }
};