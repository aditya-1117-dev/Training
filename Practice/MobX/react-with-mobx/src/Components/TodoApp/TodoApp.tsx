import TodoList from "./TodoList.tsx";
import {observer} from "mobx-react-lite";
import {TodoStore} from "./TodoStore.tsx";
import {useContext} from "react";
import {TodoContext} from "../../mobx-state-router/viewMap.tsx";
const TodoApp = () => {
    const todoStore = useContext<TodoStore>(TodoContext);

    const onNewTodo = () => {
        todoStore.addTodo(prompt('Enter a new todo:','coffee plz') as string);
    }
    return (
        <>
            <h1> Todo App </h1>
            <button onClick={onNewTodo}>New Todo </button>
            <TodoList todo={todoStore.todo} onStatusChange={todoStore.setTodoStatus}/>
        </>
    )
}
export default observer(TodoApp);