import {action, makeObservable, observable} from "mobx";

export class TodoStore {
    @observable todo : { task : string, finished : boolean }[] = [];
    @observable a = 10;

    constructor() {
        makeObservable(this);
    }

    @action
    addTodo(task : string){
        this.todo.push({
            task : task,
            finished : false,
        });
    }

    @action
    setTodoStatus(index : number, status : boolean){
        this.todo[index].finished = status
    }
}