import {makeAutoObservable, autorun, reaction} from "mobx"

class Animal {
    name :  string
    energyLevel : number

    constructor(name : string) {
        this.name = name
        makeAutoObservable(this)
        this.energyLevel = 100
    }

    reduceEnergy() {
        this.energyLevel -= 10
    }

    get isHungry() {
        return this.energyLevel < 50
    }
}
const giraffe = new Animal("Gary")

reaction(
    () => giraffe.isHungry,
    isHungry => {
        if (isHungry) {
            console.log("Now I'm hungry!")
        } else {
            console.log("I'm not hungry!")
        }
        console.log("Energy level:", giraffe.energyLevel)
    }
)

// autorun(() => {
//     console.log("Energy level:", giraffe.energyLevel)
// })
//
// autorun(() => {
//     if (giraffe.isHungry) {
//         console.log("Now I'm hungry!")
//     } else {
//         console.log("I'm not hungry!")
//     }
// })

console.log("Now let's change state!")
for (let i = 0; i < 10; i++) {
    giraffe.reduceEnergy()
}
