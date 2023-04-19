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