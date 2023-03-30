import { BUN, DATA_SOURCE, MAIN, SAUCE } from "./constants";

export const getFilteredData = arr => {
    let hasBun = false;
    return arr.filter(nextIngredient => {
        if (nextIngredient.type === 'bun') {
            if (hasBun) {
                return false;
            } else {
                hasBun = true;
                return true;
            }
        } else {
            return true;
        }
    });
};

export const categories = [
    {
        type: BUN,
        title: 'Булки',
        data: []
    },
    {
        type: SAUCE,
        title: 'Соусы',
        data: []
    },
    {
        type: MAIN,
        title: 'Начинки',
        data: []
    }
];

export const getСategorizedData = data => {
    const categorizedData = JSON.parse(JSON.stringify(categories));

    if (data) {
        data.forEach(nextIngredient => {
            const category = categorizedData.find(nextCat => nextCat.type === nextIngredient.type);
            if (category) {
                category.data.push(nextIngredient);
            }
        });
    }

    return categorizedData;
};

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = async () => {
    const res = await fetch(DATA_SOURCE + 'auth/token', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
    return checkReponse(res);
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkReponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkReponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};