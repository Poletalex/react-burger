import { DATA_SOURCE } from "../../utils/constants";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_CLOSE = 'REGISTER_CLOSE';

export const register = ({ name, email, password }) => dispatch => {
    if (name && email && password) {
        dispatch({
            type: REGISTER_REQUEST
        });
        (async () => {
            try {
                const res = await fetch(DATA_SOURCE + 'auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email,  password, password })
                });
                if (res.ok) {
                    const { success } = await res.json();
                    if (success) {
                        dispatch({
                            type: REGISTER_SUCCESS
                        });
                    }
                } else {
                    throw new Error(`Ошибка ${res.status}`)
                }
            } catch (err) {
                dispatch({
                    type: REGISTER_FAILED
                });
            };
        })();
    }
};