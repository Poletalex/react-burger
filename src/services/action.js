import { DATA_SOURCE } from "../utils/constants";
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
            const res = await fetch(DATA_SOURCE + 'auth/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            if (res.ok) {
                const { success, user } = await res.json();
                if (success) {
                    dispatch(setUser(user));
                }
            } else {
                throw new Error(`Ошибка ${res.status}`)
            }
        } catch (err) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(setUser(null));
        };
    })();
};

export const patchUser = body => dispatch => {
    (async () => {
        try {
            const res = await fetch(DATA_SOURCE + 'auth/user', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: body && JSON.stringify(body)
            });
            if (res.ok) {
                const { success, user } = await res.json();
                if (success) {
                    dispatch(setUser(user));
                }
            } else {
                throw new Error(`Ошибка ${res.status}`)
            }
        } catch {};
    })();
};

export const register = ({ name, email, password }) => dispatch => {
    if (name && email && password) {
        (async () => {
            try {
                const res = await fetch(DATA_SOURCE + 'auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });
                if (res.ok) {
                    const { success, user, accessToken, refreshToken } = await res.json();
                    if (success) {
                        const accessTokenWithoutBearer = accessToken.split('Bearer ')[1];
                        localStorage.setItem("accessToken", accessTokenWithoutBearer);
                        localStorage.setItem("refreshToken", refreshToken);
                        dispatch(setUser(user));
                        dispatch(setAuthChecked(true));
                    }
                } else {
                    throw new Error(`Ошибка ${res.status}`)
                }
            } catch { };
        })();
    }
};

export const login = ({ email, password }) => dispatch => {
    if (email && password) {
        (async () => {
            try {
                const res = await fetch(DATA_SOURCE + 'auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                if (res.ok) {
                    const { success, user, accessToken, refreshToken } = await res.json();
                    if (success) {
                        const accessTokenWithoutBearer = accessToken.split('Bearer ')[1];
                        localStorage.setItem("accessToken", accessTokenWithoutBearer);
                        localStorage.setItem("refreshToken", refreshToken);
                        dispatch(setUser(user));
                        dispatch(setAuthChecked(true));
                    }
                } else {
                    throw new Error(`Ошибка ${res.status}`)
                }
            } catch { };
        })();
    }
};

export const logout = () => dispatch => {
    (async () => {
        try {
            const res = await fetch(DATA_SOURCE + 'auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: localStorage.getItem("refreshToken"),
                }),
            });
            if (res.ok) {
                const { success } = await res.json();
                if (success) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null));
                    dispatch(setAuthChecked(false));
                }
            } else {
                throw new Error(`Ошибка ${res.status}`)
            }
        } catch { };
    })();
};