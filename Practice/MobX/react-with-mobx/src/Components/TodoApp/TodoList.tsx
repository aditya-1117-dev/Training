import { observer } from "mobx-react-lite";

const TodoList = observer( ({ todo, onStatusChange }: { todo : {task:string, finished:boolean}[], onStatusChange : (idx : number, status : boolean)=> void } ) => {
    return (
        <>
            {todo.map(( {task, finished} :  {task:string, finished:boolean}, idx : number) => (
                <li key={idx}>
                    <input type="checkbox" checked={finished} onChange={()=> onStatusChange(idx, !finished)} />
                    {task}
                </li>
            ))}
        </>
    );
});
export default TodoList;
