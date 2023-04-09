import { BUN, BURGER_API, MAIN, SAUCE } from "./constants";

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

export const customFetch = async (endpoint, options) => {
    const res = await fetch(`${BURGER_API}${endpoint}`, options);
    if (res.ok) {
        const data = await res.json();
        if (data.success) {
            return data;
        } else {
            throw new Error(`Ответ не success: ${data}`);
        }
    } else {
        throw new Error(`Ошибка ${res.status}`)
    }
};

export const tokenRefresh = async () => {
    const res = await customFetch('auth/token', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
    return res;
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await customFetch(url, options);
        return res;
    } catch (err) {
        if (err.message === "jwt expired") {
            const { accessToken, refreshToken } = await tokenRefresh();
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("accessToken", accessToken);
            options.headers.authorization = accessToken;
            const res = await customFetch(url, options);
            return res;
        } else {
            throw err;
        }
    }
};