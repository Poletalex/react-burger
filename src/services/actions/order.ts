import { Dispatch } from "redux";
import { TIngredient } from "../../utils/types";
import { customFetch } from "../../utils/utils";
import { CLEAR_INGREDIENTS } from "./burger-constructor";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export const createOrder = (data: Array<TIngredient | null>)  => (dispatch: Dispatch) => {
    dispatch({
        type: GET_ORDER_REQUEST
    });
    (async () => {
        try {
            if (data.length > 0) {
                const res = await customFetch('orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    },
                    body: JSON.stringify({
                        "ingredients": data.map(nextIngredient => nextIngredient?._id)
                    })
                });
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    orderNum: res.order.number
                })

                dispatch({
                    type: CLEAR_INGREDIENTS
                });
            }
        } catch {
            dispatch({
                type: GET_ORDER_FAILED
            });
        };
    })();
};