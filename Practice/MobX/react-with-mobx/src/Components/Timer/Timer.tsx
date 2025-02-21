import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"

// Model the application state.
//
// export class Timer{
//     secondsPassed: number = 0;
//     constructor() {
//          makeAutoObservable(this);
//     }
//     reset = () => {
//         this.secondsPassed = 0
//     }
//     increase= () => {
//         this.secondsPassed += 1
//     }
//     multiple5Times = ()=> {
//         return 5* this.secondsPassed;
//     }
// }
// // Build a "user interface" that uses the observable state.
// export const TimerView = observer(({timer} : {timer: Timer}) => (
//     <button onClick={() => timer.reset()}>Seconds passed: {timer.secondsPassed}</button>
// ))


// Model the application state.
function createTimer() {
    return makeAutoObservable({
        secondsPassed: 0,
        increase() {
            this.secondsPassed += 1
        },
        reset() {
            this.secondsPassed = 0
        }
    })
}

export const myTimer = createTimer()

// Build a "user interface" that uses the observable state.
export const TimerView = observer(({ timer }) => (
    <button onClick={() => timer.reset()}>Seconds passed: {timer.secondsPassed}</button>
))

// Update the 'Seconds passed: X' text every second.
setInterval(() => {
    myTimer.increase()
}, 1000)