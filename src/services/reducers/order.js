import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from '../actions/order';

const initialState = {
    orderNum: null,
    request: false,
    failed: false
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                request: true,
                failed: false,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderNum: action.orderNum,
                request: false
            };
        }
        case GET_ORDER_FAILED: {
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