import { customFetch } from "../../utils/utils";

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const FORGOT_PASSWORD_CLOSE = 'FORGOT_PASSWORD_CLOSE';

export const forgotPassword = email => dispatch => {
    if (email) { 
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        (async () => {
            try {
                await customFetch('password-reset', {
                    method: 'POST',
                    body: JSON.stringify({ email })
                });
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS
                });
            } catch {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED
                });
            };
        })();
    }    
};