import { DATA_SOURCE } from "../../utils/constants";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export const createOrder = data => dispatch => {
    dispatch({
        type: GET_ORDER_REQUEST
    });
    (async () => {
        try {
            if (data.length > 0) {
                const res = await fetch(DATA_SOURCE + 'orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify({
                        "ingredients": data.map(nextIngredient => nextIngredient._id)
                    })
                });
                if (res.ok) {
                    const { order } = await res.json();
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        orderNum: order.number
                    })
                } else {
                    throw new Error(`Ошибка ${res.status}`)
                }
            }
        } catch (err) {
            dispatch({
                type: GET_ORDER_FAILED
            });
        };
    })();
};