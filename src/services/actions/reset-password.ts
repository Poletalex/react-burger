import { Dispatch } from "redux";
import { customFetch } from "../../utils/utils";

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_CLOSE = 'RESET_PASSWORD_CLOSE';

type TPassword = {
    password: string;
    token: string;
};

export const resetPassword = ({ password, token }: TPassword) => (dispatch: Dispatch) => {
    if (password && token) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        (async () => {
            try {
                await customFetch('password-reset/reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ password, token })
                });
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                });
            } catch {
                dispatch({
                    type: RESET_PASSWORD_FAILED
                });
            };
        })();
    }
};