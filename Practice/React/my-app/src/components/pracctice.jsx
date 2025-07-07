import React, {useEffect, useState} from "react";

function Card({ children }) {
    return (
        <div className="card">
            {children}
        </div>
    );
}

function getImageUrl(person, size = 's') {
    return (
        'https://i.imgur.com/' +
        person.imageId +
        size +
        '.jpg'
    );
}

function Avatar({ person, size }) {
    return (
        <img
            className="avatar"
            src={getImageUrl(person)}
            alt={person.name}
            width={size}
            height={size}
        />
    );
}

export default function Profile() {
    return (
        <Card>
            <Avatar
                size={100}
                person={{
                    name: 'Katsuko Saruhashi',
                    imageId: 'YfeOqp2'
                }}
            />
        </Card>
    );
}


class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}


export const recipes = [{
    id: 'greek-salad',
    name: 'Greek Salad',
    ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
    id: 'hawaiian-pizza',
    name: 'Hawaiian Pizza',
    ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
    id: 'hummus',
    name: 'Hummus',
    ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];

// export function RecipeList() {
//     const lists = recipes.map(l=>
//         <li key={l.id}>
//             <h2>{l.name}</h2>
//             <ul>
//                 {l.ingredients.map(i=><li key={i}>{i}</li>)}
//             </ul>
//         </li>
//     );
//     return (
//         <div>
//             <h1>Recipes</h1>
//             <ul>{lists}</ul>
//         </div>
//     );
// }


function Recipe({ id, name, ingredients }) {
    return (
        <div>
            <h2>{name}</h2>
            <ul>
                {ingredients.map(ingredient =>
                    <li key={ingredient}>
                        {ingredient}
                    </li>
                )}
            </ul>
        </div>
    );
}

// export function RecipeList() {
//     return (
//         <div>
//             <h1>Recipes</h1>
//             {recipes.map(recipe =>
//                 <Recipe {...recipe} key={recipe.id} /> // as we shouldn't pass key as prop so set key to a component itself
//                 // This is because this key is needed directly within the context of the surrounding array
//             )}
//         </div>
//     );
// }

// flaw using DOM event handlers in react
// keys - use in rendering
function Practice() {

    function handleClick() {
        
    }
    var check = true;
    return (
        <>
        {check && <button onClick={(e)=> handleClick(e)}></button>}
        </>
    );
}

export function DomHandling() {
    useEffect(() => {
        document
            .getElementById("button")
            .addEventListener("click", () =>
                console.log("DOM event handler")
            );
    }, []);

    const [arr, setArr] = useState([]);
    const handleReactClick = (a) => {
        console.log("React event handler");
        const copy = [...arr, a];
        // copy.sort();
        setArr(copy);
    };

    return (
        <button id="button" onClick={handleReactClick}>
            Click Me
        </button>
    );
}


export function KeyForm() {
    const [version, setVersion] = useState(0);

    function handleReset() {
        setVersion(version + 1);
    }

    return (
        <>
            <button onClick={handleReset}>Reset</button>
            <Form key={version} />
        </>
    );
}

function Form() {
    const [name, setName] = useState('Taylor');

    return (
        <>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <p>Hello, {name}.</p>
        </>
    );
}

