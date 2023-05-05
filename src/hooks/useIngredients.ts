import { useAppSelector } from "../store/hooks";
import { TIngredient } from "../utils/types";

type THookResult = {
    ingredients: Array<TIngredient>;
};

export const useIngredients = (numbers: Array<string>): THookResult => {
    const { ingredients } = useAppSelector(store => store.ingredients);

    return { ingredients: ingredients.filter((nextItem: TIngredient) => numbers.includes(nextItem._id)) };
};