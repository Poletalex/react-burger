import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLOSE_ORDER_MODAL
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
        case CLOSE_ORDER_MODAL: { 
            return {
                ...state,
                orderNum: null
            };
        }
        default: {
            return state
        }
    }
}; 