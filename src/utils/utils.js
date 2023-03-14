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