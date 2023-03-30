import {
    REGISTER_CLOSE,
    REGISTER_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "../actions/register";

const initialState = {
    accessToken: null,
    refreshToken: null,
    request: false,
    failed: false
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST: {
            return {
                ...state,
                request: true,
                failed: false,
            };
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                request: false
            };
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                failed: true,
                request: false
            };
        }
        case REGISTER_CLOSE: {
            return {
                ...state
            };
        }
        default: {
            return state
        }
    }
}; 