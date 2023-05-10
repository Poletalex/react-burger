import { BURGER_API, Category, ORDER_STATUS } from "./constants";
import { TIngredient, TOrderIngredient, TOrderStatus } from "./types";

export const getFilteredData = (arr: TIngredient[]) => {
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

type TCategory = {
    type: Category;
    title: string;
    data: TIngredient[]
};

export const categories = [
    {
        type: Category.BUN,
        title: 'Булки',
        data: []
    },
    {
        type: Category.SAUCE,
        title: 'Соусы',
        data: []
    },
    {
        type: Category.MAIN,
        title: 'Начинки',
        data: []
    }
];

export const getСategorizedData = (data: Array<TIngredient>) => {
    const categorizedData: TCategory[] = JSON.parse(JSON.stringify(categories));

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

export const customFetch = async (endpoint: string, options?: RequestInit) => {
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

export const fetchWithRefresh = async (url: string, options: any ) => {
    try {
        const res = await customFetch(url, options);
        return res;
    } catch (err: any) {
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

export const getOrderStatus = (status: TOrderStatus): string => ORDER_STATUS[status];

export const getTotalPrice = (sum: number, nextItem: TOrderIngredient) => sum + nextItem.price * nextItem.count;