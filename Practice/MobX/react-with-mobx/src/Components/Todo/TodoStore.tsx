import {makeObservable, observable, action, computed} from "mobx"
import { observer } from "mobx-react-lite"


export const TodoListView = observer(({ todoList } : { todoList : TodoList}) => (
    <div>
        <ul>
            {todoList.todos.map((todo : any) => (
                <TodoView todo={todo} key={todo.id} />
            ))}
        </ul>
        Tasks left: {todoList.unfinishedTodoCount}
    </div>
))

const TodoView = observer(({ todo } : {todo : Todo}) => (
    <li>
        <input type="checkbox" defaultChecked={todo.finished} onClick={() => todo.toggle()} />
        {todo.title}
    </li>
))

export class TodoList {
    todos: object[] = []
    get unfinishedTodoCount() {
        return this.todos.filter((todo : any) => !todo?.finished).length
    }
    constructor(todos : object[]) {
        makeObservable(this, {
            todos: observable,
            unfinishedTodoCount: computed
        })
        this.todos = todos
    }
}

export class Todo {
    id : number = Math.random()
    title : string = ""
    finished : boolean = false

    constructor(title : string) {
        makeObservable(this, {
            title: observable,
            finished: observable,
            toggle: action
        })
        this.title = title
    }

    toggle() {
        this.finished = !this.finished
    }
}



