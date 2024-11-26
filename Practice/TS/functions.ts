printId(10)
welcomePeople("hii")
console.log(getFirstThree([1,2]))
function printId(id: number | string) {
    if (typeof id === "string") {
        // In this branch, id is of type 'string'
        console.log(id.toUpperCase());
    } else {
        // Here, id is of type 'number'
        console.log(id);
    }
}
function welcomePeople(...x: (string[] | string)[]) {
    if (Array.isArray(x)) {
        console.log("Hello, " + x.join(" and "));
    } else {
        console.log("Welcome lone traveler " + x);
    }
}
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
    return x.slice(0, 3);
}

function printText(s: string, alignment: "left" | "right" | 1) {
    // ...
    console.log(s, typeof alignment)
}
printText("Hello, world", 1);
printText("G'day, mate", "centre");
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.

type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
}

function myFunc(someArg: number) {
    return someArg > 3;
}
myFunc.description = "default description";

doSomething(myFunc);


function firstElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
}

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n));
console.log(parsed, typeof parsed)


function invokeLater(args: any[], callback: (...args: any[]) => void) {
    callback(...args)
}
invokeLater([1, 2], (x, y) => console.log(x + ", " + y));
invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
    if (d !== undefined && y !== undefined) {
        console.log("In")
        return new Date(y, mOrTimestamp, d);
    } else {
        console.log("Out")
        return new Date(mOrTimestamp);
    }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3);
// console.log(d3, "hek")


enum E {
    X = "Holle",
    Y = 1
}

console.log(E,E.X, E.Y, typeof E, E["X"], E[1])

type voidFunc = () => void;

const f1: voidFunc = () => {

};

const v1 = f1();
console.log(typeof v1, v1, typeof f1)


function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
}

// const parsed = map(["1", "2", "3"], (n) => parseInt(n));
// console.log(parsed, typeof parsed)

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}

const arr = combine<string | number>([1, 2, 3], ["hello"]);
console.log(arr)

function firstElement<Type>(arr: Type[]): Type | undefined {
    // console.log( typeof arr[0]) ;
    return arr[0]
}

console.log(typeof firstElement([ "hel", 1]))