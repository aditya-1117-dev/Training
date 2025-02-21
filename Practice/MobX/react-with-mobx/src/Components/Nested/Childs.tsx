import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react-lite";

function createStore() {
    return makeAutoObservable({
        a : 10,
        b : 20,
        increaseA(){ this.a += 10},
        increaseB(){ this.b += 10}
    })
}

const storeObject = createStore();

export const Child1 = observer(() => {
    return <button onClick={() => storeObject.increaseA()}>First Value: {storeObject.a}</button>
});

export const Child2 = observer(() => {
    return <button onClick={() => storeObject.increaseB()}>Second Value: {storeObject.b}</button>
});

