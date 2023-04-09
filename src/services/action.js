import { customFetch } from "../utils/utils";
import { setAuthChecked, setUser } from "./user";

export const checkUserAuth = () => dispatch => {
    if (localStorage.getItem('accessToken')) {
        try {
            dispatch(getUser());
        } catch {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(setUser(null));
        } finally {
            dispatch(setAuthChecked(true));
        }
    } else {
        dispatch(setAuthChecked(true));
    }
};

export const getUser = () => dispatch => {
    (async () => {
        try {
            const res = await customFetch('auth/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            dispatch(setUser(res.user));
        } catch {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(setUser(null));
        };
    })();
};

export const patchUser = body => dispatch => {
    (async () => {
        try {
            const res = await customFetch('auth/user', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: body && JSON.stringify(body)
            });
            dispatch(setUser(res.user));
        } catch { };
    })();
};

export const register = ({ name, email, password }) => dispatch => {
    if (name && email && password) {
        (async () => {
            try {
                const res = await customFetch('auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });
                const { user, accessToken, refreshToken } = res;
                const accessTokenWithoutBearer = accessToken.split('Bearer ')[1];
                localStorage.setItem("accessToken", accessTokenWithoutBearer);
                localStorage.setItem("refreshToken", refreshToken);
                dispatch(setUser(user));
                dispatch(setAuthChecked(true));
            } catch { };
        })();
    }
};

export const login = ({ email, password }) => dispatch => {
    if (email && password) {
        (async () => {
            try {
                const res = await customFetch('auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                const { user, accessToken, refreshToken } = res;
                const accessTokenWithoutBearer = accessToken.split('Bearer ')[1];
                localStorage.setItem("accessToken", accessTokenWithoutBearer);
                localStorage.setItem("refreshToken", refreshToken);
                dispatch(setUser(user));
                dispatch(setAuthChecked(true));
            } catch { };
        })();
    }
};

export const logout = () => dispatch => {
    (async () => {
        try {
            await customFetch('auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: localStorage.getItem("refreshToken"),
                }),
            });
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(setUser(null));
            dispatch(setAuthChecked(false));
        } catch { };
    })();
};