import {ingredientList} from "../assets/constants";

export const getRandomIngredients = (): Record<string, number> => {
    const availableIngredients: Record<string, number> = {};
    for (const ingredientName in ingredientList) {
        if (Math.random() > 0.10) {
            const ingredient = ingredientList[ingredientName];
            const randomAmount = Math.ceil(Math.random() * (ingredient.max - ingredient.min) + ingredient.min);
            availableIngredients[ingredientName] = parseFloat(randomAmount.toFixed(2));
        }
    }
    return availableIngredients;
}