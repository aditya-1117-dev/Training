import DepartmentPage from "../Pages/DepartmentPage.tsx";
import HomePage from "../Pages/HomePage.tsx";
import NotFoundPage from "../Pages/NotFoundPage.tsx";
import TodoApp from "../Components/TodoApp/TodoApp.tsx";
import {TodoStore} from "../Components/TodoApp/TodoStore.tsx";
import {createContext} from "react";

const todoStore = new TodoStore();
todoStore.addTodo('Aditya Here');

export const TodoContext = createContext<TodoStore>(todoStore);

export const viewMap = {
    department: <DepartmentPage />,
    home: <HomePage />,
    notFound: <NotFoundPage />,
    todoapp : (
        <TodoContext.Provider value={todoStore}>
            <TodoApp />
        </TodoContext.Provider>
    )
};