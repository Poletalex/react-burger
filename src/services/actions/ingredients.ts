import { Dispatch } from "redux";
import { customFetch } from "../../utils/utils";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredients = () => (dispatch: Dispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    });
    (async () => {
        try {
            const res = await customFetch('ingredients');
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: res.data
            });
        } catch {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            });
        };
    })();
};