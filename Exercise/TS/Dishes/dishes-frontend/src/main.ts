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
    updateCreatableDishesUI(creatableDishes);

    const dishIdAndIngredientsQuantity: Record<number, number> = findDishIdAndIngredientsQuantity(creatableDishes);
    updateTopDishesUI(creatableDishes, dishIdAndIngredientsQuantity);

    const totalIngredients: Ingredient = findTotalQuantityRequiredPerIngredient(creatableDishes);
    updateTotalIngredientsUI(totalIngredients);

    const  dishesWithMissingIngredients : Dish[] = findMissingIngredients(dishes, ingredients);
    updateMissingIngredientsUI(dishesWithMissingIngredients);
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

function updateCreatableDishesUI(dishes : Dish[]): void {
    const list = document.getElementById("creatable-dishes-list") as HTMLUListElement;
    list.innerHTML = '';
    dishes.forEach(dish => {
        const li = document.createElement("li");
        const subList = document.createElement("li");
        subList.style.listStyle = 'none';
        const ingredients = Object.entries(dish.ingredients).map(([ingredient, quantity]) => `${ingredient}: ${quantity}` );
        li.textContent = `${dish.name}  (Time: ${dish.time} mins)`;
        subList.textContent = ` - Ingredients : ${ingredients}`;
        li.appendChild(subList);
        list.appendChild(li);
    });
}

function updateTopDishesUI(dishes : Dish[], dishIdAndIngredientsQuantity : Record<number, number>): void {
    const list = document.getElementById("top-dishes-list") as HTMLUListElement;
    list.innerHTML = '';
    dishes.forEach(dish => {
        if (dishIdAndIngredientsQuantity[dish.id]) {
            const li = document.createElement("li");
            li.textContent = `${dish.name} (Total Ingredients Required : ${dishIdAndIngredientsQuantity[dish.id]})`;
            list.appendChild(li);
        }
    });
}

function updateTotalIngredientsUI(ingredients : Ingredient): void {
    const list = document.getElementById("total-ingredients-list") as HTMLUListElement;
    list.innerHTML = '';
    for(const ingredient in ingredients) {
        const li : HTMLElement = document.createElement("li");
        li.innerHTML = `${ingredient}: ${ingredients[ingredient]}`;
        list.appendChild(li);
    }
}

function updateMissingIngredientsUI(dishesWithMissingIngredients : Dish[]) : void {
    const dropdown: HTMLSelectElement = document.getElementById("missing-dish-dropdown") as HTMLSelectElement;
    dropdown.innerHTML = '<option value="">  Select a Dish  </option>';

    dishesWithMissingIngredients.forEach((dish) => {
        const option : HTMLOptionElement = document.createElement("option");
        option.value = dish.id.toString();
        option.textContent = dish.name;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', function () {
        const selectedDishId : number = parseInt(dropdown.value);
        const selectedDish : Dish = dishesWithMissingIngredients.find(dish => dish.id === selectedDishId) as Dish;
        const displayMissingIngredient = document.getElementById("missing-ingredients") as HTMLDivElement;
        displayMissingIngredient.innerHTML = '';
        if (selectedDish) {
            const ingredientsList : string[] = Object.entries(selectedDish.ingredients).map(([ingredient, quantity]) => `${ingredient}: ${quantity}`);
            displayMissingIngredient.innerHTML = `<h3>Missing Ingredients for ${selectedDish.name}:</h3> <li>${ingredientsList}</li>`;
        }
    });
}