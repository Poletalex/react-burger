import { useAppSelector } from "../store/hooks";
import { TIngredient, TOrderIngredient } from "../utils/types";

type THookResult = {
    ingredients: Array<TOrderIngredient>;
};

/**
 * Хук для получения объектов ингредиентов по их номерам из заказа
 * (также указывается кол-во одинаковых ингредиентов)
 * @param numbers 
 * @returns 
 */
export const useIngredients = (numbers: Array<string>): THookResult => {
    const { ingredients } = useAppSelector(store => store.ingredients);

    return {
        ingredients: (numbers)
            .reduce((res, nextNumber) => {
                const found = ingredients?.find((ingredient: TIngredient) => ingredient._id === nextNumber);
                if (found) { 
                    const existed = res.find((ingredient: TOrderIngredient) => ingredient._id === nextNumber);
                    if (existed) {
                        existed.count++;
                    } else { 
                        res.push({ ...found, count: 1 });
                    }                    
                }
                return res;
            }, [] as TOrderIngredient[]) || []
    };
};