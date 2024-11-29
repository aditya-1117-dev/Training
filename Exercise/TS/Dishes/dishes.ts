type Ingredient = Record<string, number>;
interface Dish {
    id: number;
    name: string;
    ingredients: Ingredient;
    time: number;
}

async function fetchData(): Promise<[Dish[],Ingredient]> {
    try{
        const [dishRes, ingredientRes] = await Promise.all([
            fetch("http://localhost:3000/api/dishes"),
            fetch("http://localhost:3000/api/ingredients")
        ]);
        if (!dishRes.ok || !ingredientRes.ok) {
            throw new Error("Error in fetching Data");
        }
        const dishes: Dish[] = await dishRes.json();
        const ingredients: Ingredient = await ingredientRes.json();
        return [dishes, ingredients];
    }catch (e) {
        console.log(e);
    }
}

fetchData().then(([dishes, ingredients])=> {

    const [creatableDishes, mapIdAndIngredients, totalIngredients, missingIngredients] : [Dish[], Record<number, number>, Ingredient, Dish[]] = findCreatableDishes(dishes, ingredients);
    console.log("Creatable Dishes Are : ", creatableDishes);

    const topDishes: Dish[] = creatableDishes.filter( (dish) => dish.id in mapIdAndIngredients);
    console.log("Top 3 easiest dishes are : ", topDishes);

    console.log("Total amount of each ingredients used : ", totalIngredients);

    console.log("Dishes with missing ingredients are : ", missingIngredients);
});

function findCreatableDishes(dishes : Dish[], ingredients: Ingredient): [Dish[], Record<number, number>, Ingredient, Dish[]] {
    const creatableDishes : Dish[] = [];
    let mapIdAndIngredients : Record<number, number> = {};
    let totalIngredients : Ingredient = {};
    let missingIngredients : Dish[] = [];

    for (let i=0; i < dishes.length; i++) {
        const dish : Dish = dishes[i];
        let flag : boolean = true;
        let totalIngredientCount = 0;

        for (const ingredient in dish.ingredients) {
            const requiredQuantity : number = dish.ingredients[ingredient];
            const availableQuantity : number = ingredients[ingredient] || 0;
            totalIngredientCount += requiredQuantity;
            if (availableQuantity < requiredQuantity) {
                flag = false;
                break;
            }
        }
        if (flag) {
            creatableDishes.push(dish);
            mapIdAndIngredients[dish.id] = totalIngredientCount;

            for (const ingredient in dish.ingredients) {
                if (!totalIngredients[ingredient]) totalIngredients[ingredient] = 0;
                totalIngredients[ingredient] += dish.ingredients[ingredient];
            }
        }else{
            let missingIngredientsObject : Ingredient = {};
            for (const ingredient in dish.ingredients) {
                const requiredQuantity: number = dish.ingredients[ingredient];
                const availableQuantity: number = ingredients[ingredient] || 0;

                if (availableQuantity < requiredQuantity) missingIngredientsObject[ingredient] = requiredQuantity - availableQuantity;
                else missingIngredientsObject[ingredient] = 0;
            }

            missingIngredients.push({
                id: dish.id,
                name : dish.name,
                time : dish.time,
                ingredients : missingIngredientsObject
            })
        }
    }
    mapIdAndIngredients = Object.fromEntries(
        Object.entries(mapIdAndIngredients)
            .sort(([ a], [ b]) => a - b)
            .slice(0, 3)
    );
    return [ creatableDishes, mapIdAndIngredients, totalIngredients, missingIngredients];
}
