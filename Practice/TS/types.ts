type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
    if ("swim" in animal) {
        return animal.swim();
    }

    return animal.fly();
}
move({ swim: function (){
        console.log('ehj')
    }})

interface Shape {
    kind: "circle" | "square";
    radius?: number;
    sideLength?: number;
}
function getArea(shape: Shape) {
    console.log(shape.radius)
    return Math.PI * shape.radius ** 2;
}

console.log(getArea({kind:"circle"}))

type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
    console.log(fn)
    console.log(fn.description + " returned " + fn(6));
}

function myFunc(someArg: number) {
    return someArg > 3;
}
myFunc.description = "default description";
console.log(myFunc)
doSomething(myFunc);
