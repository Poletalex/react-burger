import { Category } from "./constants";

export type TIngredient = {
    _id: string;
    name: string;
    type: Category;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uniqueId?: string;
};

export type TIngredientState = {
    ingredients: TIngredient[] | null;
    request: boolean;
    failed: boolean;
};

export type TConstructorState = {
    bun: TIngredient | null,
    notBun: TIngredient[]
};

export type TUser = {
    name: string;
    email: string;
    password?: string;
};

export type TUserState = {
    user: TUser | null;
    isAuthChecked: Boolean;
};

export type TForm = {
    name?: string;
    email?: string;
    password?: string;
};

export type TDragged = {
    id: number;
    ingredient: TIngredient;
};

export type TOrder = {
    id: string;
    time: string;
    name: string;
    ingredients: Array<TIngredient>;
    price: number;
    status?: string;
};