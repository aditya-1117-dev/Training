import React, {
    createContext,
    useReducer,
    useContext,
    useEffect,
    useRef,
    useState,
    useCallback,
    memo,
    useMemo
} from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
    console.log('PArent');
    return <MyContextProvider />
}
// if theme state changes, hierarchy from MyContextProvider re-renders but not its parent-MyApp
function MyContextProvider(){
    const [theme, setTheme] = useState('light');
    console.log("mycontextprovider");
    return (
        <ThemeContext.Provider value={theme}>
            <Form />
            <label>
                <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={(e) => {
                        setTheme(e.target.checked ? 'dark' : 'light')
                    }}
                />
                Use dark mode
            </label>
        </ThemeContext.Provider>
    );
}

function Form({ children }) {
    console.log("rndered form")
    return (
        <Panel title="Welcome">

            <Button>Sign up</Button>
            <Button>Log in</Button>
        </Panel>
    );
}

function Panel({ title, children }) {
    const theme = useContext(ThemeContext);
    const className = 'panel-' + theme;
    return (
        <section className={className}>
            <h1>{title}</h1>
            {children}
        </section>
    )
}

function Button({ children }) {
    // console.log("Hell")
    return (
        <button>
            {children}
        </button>
    );
}




export function Counter() {
    const countRef = useRef(0);
    useEffect(() => {
        countRef.current += 1;
        // also we can perform dom manipulations directly in react as :
        countRef.current.style.backgroundColor = "yellow";
        countRef.current.focus();
    });// gets called after every render
    const [search, setSearch] = useState("");
    return (
        <>
            <input type="text" ref={countRef} value={search} onChange={e => setSearch(e.target.value)}/><br/>
            <p>number of re-renders are : {countRef}</p>
            <Stopwatch/>
        </>
    )
}

function Stopwatch() {
    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null);
    const intervalRef = useRef(null);

    function handleStart() {
        setStartTime(Date.now());
        setNow(Date.now());

        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setNow(Date.now());
        }, 10);
    }

    function handleStop() {
        clearInterval(intervalRef.current);
    }

    let secondsPassed = 0;
    if (startTime != null && now != null) {
        secondsPassed = (now - startTime) / 1000;
    }

    return (
        <>
            <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
            <button onClick={handleStart}>
                Start
            </button>
            <button onClick={handleStop}>
                Stop
            </button>
        </>
    );
}

function reducer(state, action) {
    if (action.type === 'incremented_age') {
        console.log("incremented");
        return {
            age: state.age + 1
        };
    }
    throw Error('Unknown action.');
}

export function Counter2() {
    const [state, dispatch] = useReducer(reducer, { age: 42 });

    return (
        <>
            <button onClick={() => {
                dispatch({ type: 'incremented_age' })
            }}>
                Increment age
            </button>
            <p>Hello! You are {state.age}.</p>
        </>
    );
}



export const ParentH = () => {
    const [value, setValue] = useState("adi");
    const [childValue, setChildValue] = useState(1);

    console.log("Parent re-rendered");

    const handleClick = useCallback(() => console.log("Clicked!"),
        [childValue]);

    const visibleTodos = useMemo(
        () => {
            console.log("in memo")
            return 1
        },
        [childValue]
    );

    return (
        <>
            <Child onClick={handleClick}/>
            <input type="text" value={value} onChange={e=> setValue(e.target.value)}/>
            <button type="button" onClick={() => setChildValue( childValue+1)}>child value : {childValue}</button>
        </>
    )
};

const Child = React.memo(({ onClick }) => {
    console.log("Child rendered!");

    return (
        <>
            <button onClick={onClick}>Click Me</button>

        </>)
});
