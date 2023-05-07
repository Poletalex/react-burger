import { useAppSelector } from "../store/hooks";
import { TIngredient } from "../utils/types";

type THookResult = {
    ingredients: Array<TIngredient>;
};

export const useIngredients = (numbers: Array<string> | undefined): THookResult => {
    const { ingredients } = useAppSelector(store => store.ingredients);
    const { order } = useAppSelector(store => store.selectedOrder);

    return { ingredients: ingredients?.filter((nextItem: TIngredient) => (order?.ingredients || numbers)?.includes(nextItem._id)) };
};