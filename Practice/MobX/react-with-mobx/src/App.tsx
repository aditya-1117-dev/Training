import './App.css'
// import {ObservableTodoStore, TodoList} from "./Components/Todo/TodoList.tsx";
import { RouterContext, RouterView } from 'mobx-state-router';
import {initRouter} from "./mobx-state-router/initRouter.tsx";
import {viewMap} from "./mobx-state-router/viewMap.tsx";

const App = () => {
    const routerStore = initRouter();

    return (
        <RouterContext.Provider value={routerStore}>
            <RouterView viewMap={viewMap} />
        </RouterContext.Provider>
    );
};

//
// function App() {
//     // const store : TodoList = new TodoList([new Todo("Get Coffee"), new Todo("Write simpler code")])
//     const observableTodoStore = new ObservableTodoStore();
//     return (
//         <>
//             <TodoList store={ observableTodoStore } />
//             {/*<h1>hi</h1>*/}
//             {/*<Parent />*/}
//             {/*<TodoListView todoList={store} />*/}
//             {/*<TimerView timer={myTimer}/>*/}
//         </>
//     )
// }
export default App;



// import {myTimer, TimerView} from "./Components/Timer/Timer.tsx";
// import {Parent} from "./Components/Nested/Parents.tsx";
// import {Timer, TimerView} from "./Components/Timer/Timer.tsx";
// function App() {
//     const myTimer = new Timer();
//     setInterval(() => {
//         myTimer.increase();
//     },1000)
//     return (
//         <>
//             <h1>Timer </h1>
//             <TimerView timer = {myTimer} />
//         </>
//     )
// }
