export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

const DATA_SOURCE = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = () => dispatch => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    });
    (async () => {
        try {
            const res = await fetch(DATA_SOURCE);
            if (res.ok) {
                const { data } = await res.json();
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: data
                });
            } else {
                throw new Error(`Ошибка ${res.status}`)
            }
        } catch (err) {
            console.log(err.message);
            dispatch({
                type: GET_INGREDIENTS_FAILED
            });
        };
    })();
};