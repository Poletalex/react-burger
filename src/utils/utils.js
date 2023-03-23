import { BUN, MAIN, SAUCE } from "./constants";

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