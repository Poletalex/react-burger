import { DATA_SOURCE } from "../../utils/constants";

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
                const res = await fetch(DATA_SOURCE + 'password-reset', {
                    method: 'POST',
                    body: JSON.stringify({ email })
                });
                if (res.ok) {
                    const { success } = await res.json();
                    if (success) {
                        dispatch({
                            type: FORGOT_PASSWORD_SUCCESS
                        });
                    }
                } else {
                    throw new Error(`Ошибка ${res.status}`)
                }
            } catch (err) {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED
                });
            };
        })();
    }    
};