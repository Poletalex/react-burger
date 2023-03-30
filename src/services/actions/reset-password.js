import { DATA_SOURCE } from "../../utils/constants";

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_CLOSE = 'RESET_PASSWORD_CLOSE';

export const resetPassword = ({ password, token }) => dispatch => {
    if (password && token) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        (async () => {
            try {
                const res = await fetch(DATA_SOURCE + 'password-reset/reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ password, token })
                });
                if (res.ok) {
                    const { success } = await res.json();
                    if (success) {
                        dispatch({
                            type: RESET_PASSWORD_SUCCESS
                        });
                    }
                } else {
                    throw new Error(`Ошибка ${res.status}`)
                }
            } catch (err) {
                dispatch({
                    type: RESET_PASSWORD_FAILED
                });
            };
        })();
    }
};