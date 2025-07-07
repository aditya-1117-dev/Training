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

    const creatableDishes: Dish[] = findCreatableDishes(dishes, ingredients);
    console.log("Creatable Dishes Are : ", creatableDishes);

    const dishIdAndIngredientsQuantity: Record<number, number> = findDishIdAndIngredientsQuantity(creatableDishes);
    const topDishes: Dish[] = creatableDishes.filter( (dish) => dish.id in dishIdAndIngredientsQuantity);
    console.log("Top 3 easiest dishes are : ", topDishes);

    const totalIngredients: Ingredient = findTotalQuantityRequiredPerIngredient(creatableDishes);
    console.log("Total amount of each ingredients used : ", totalIngredients);

    const  missingIngredients : Dish[] = findMissingIngredients(dishes, ingredients);
    console.log("Dishes with missing ingredients are : ", missingIngredients);
});

function findCreatableDishes(dishes : Dish[], ingredients: Ingredient): Dish[]{
    const creatableDishes : Dish[] = [];
    for (let i=0; i < dishes.length; i++) {
        const dish : Dish = dishes[i];
        let flag : boolean = true;

        for (const ingredient in dish.ingredients) {
            const requiredQuantity : number = dish.ingredients[ingredient];
            const availableQuantity : number = ingredients[ingredient] || 0;
            if (availableQuantity < requiredQuantity) {
                flag = false;
                break;
            }
        }
        if (flag) {
            creatableDishes.push(dish);
        }
    }
    return creatableDishes;
}

function findDishIdAndIngredientsQuantity(creatableDishes : Dish[]):  Ingredient {
    let dishIdAndIngredientsQuantity : Record<number, number> = {};
    for (let i=0; i < creatableDishes.length; i++) {
        const dish : Dish = creatableDishes[i];
        let flag : boolean = true;
        let totalIngredientSum = 0;
        for (const ingredient in dish.ingredients) {
            const requiredQuantity : number = dish.ingredients[ingredient];
            totalIngredientSum += requiredQuantity;
        }
        dishIdAndIngredientsQuantity[dish.id] = totalIngredientSum;
    }
    dishIdAndIngredientsQuantity = Object.fromEntries(
        Object.entries(dishIdAndIngredientsQuantity)
            .sort(([ a], [ b]) => a - b)
            .slice(0, 3)
    );
    return dishIdAndIngredientsQuantity;
}

function findTotalQuantityRequiredPerIngredient(creatableDishes : Dish[] ):  Ingredient {
    let totalIngredients : Ingredient = {};
    for (let i=0; i < creatableDishes.length; i++) {
        const dish: Dish = creatableDishes[i];
        for (const ingredient in dish.ingredients) {
            if (!totalIngredients[ingredient]) totalIngredients[ingredient] = 0;
            totalIngredients[ingredient] += dish.ingredients[ingredient];
        }
    }
    return totalIngredients;
}

function findMissingIngredients(dishes : Dish[], ingredients: Ingredient): Dish[] {
    let missingIngredients : Dish[] = [];
    for (let i=0; i < dishes.length; i++) {
        const dish : Dish = dishes[i];
        let flag : boolean = true;

        for (const ingredient in dish.ingredients) {
            const requiredQuantity : number = dish.ingredients[ingredient];
            const availableQuantity : number = ingredients[ingredient] || 0;
            if (availableQuantity < requiredQuantity) {
                flag = false;
                break;
            }
        }
        if (!flag) {
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
    return missingIngredients;
}