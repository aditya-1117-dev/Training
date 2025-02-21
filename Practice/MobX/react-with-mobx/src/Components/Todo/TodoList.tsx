import {observer} from "mobx-react-lite";
import {action, autorun, computed, observable} from "mobx";

export const TodoList = observer( ({store} : {store : any}) => {
    const onNewTodo = () => {
        store.addTodo(prompt('Enter a new todo:','coffee plz'));
    }

    return (
        <div>
            { store.report }
            <ul>
                { store.todos.map(
                    (todo : any, idx : any ) => <TodoView todo={ todo } key={ idx } />
                ) }
            </ul>
            {/*{ store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null }*/}
            <button onClick={ onNewTodo }>New Todo</button>
            <small> (double-click a todo to edit)</small>
            {/*<RenderCounter />*/}
        </div>
    );
})

const TodoView = observer(({todo} : {todo:any}) => {
    const onToggleCompleted = () => {
        todo.completed = !todo.completed;
    }

    const onRename = () => {
        todo.task = prompt('Task name', todo.task) || todo.task;
    }

    return (
        <li onDoubleClick={ onRename }>
            <input
                type='checkbox'
                checked={ todo.completed }
                onChange={ onToggleCompleted }
            />
            { todo.task }
            { todo.assignee
                ? <small>{ todo.assignee.name }</small>
                : null
            }
            {/*<RenderCounter />*/}
        </li>
    );
})

// <TodoList store={ observableTodoStore } />

export class ObservableTodoStore {
    @observable accessor todos : any = [];
    @observable accessor pendingRequests = 0;

    constructor() {
        // makeObservable(this, {
        //     // todos: observable,
        //     // pendingRequests: observable,
        //     // completedTodosCount: computed,
        //     // report: computed,
        //     // addTodo: action,
        // });
        autorun(() => console.log(this.report));
    }

    @computed
    get completedTodosCount() {
        return this.todos.filter(
            (todo : any) => todo.completed === true
        ).length;
    }

    @computed
    get report() {
        if (this.todos.length === 0)
            return "<none>";
        const nextTodo = this.todos.find((todo : any) => todo.completed === false);
        return `Next todo: "${nextTodo ? nextTodo.task : "<none>"}". ` +
            `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    }

    @action
    addTodo(task : any) {
        this.todos.push({
            task: task,
            completed: false,
            assignee: null
        });
    }
}
