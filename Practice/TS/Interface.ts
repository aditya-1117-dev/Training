class Student {
    fullName: string;
    constructor(
        public firstName: string,
        public middleInitial: string,
        public lastName: string
    ) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    getName(){
        return this.middleInitial
    }
}

interface Person {
    fullName: string;
    middleInitial: string;
    firstName: string;
    lastName: string;
}

interface Person {

}

function greeter(person: Person) {
    // return "Hello, " + person.firstName + " " + person.lastName;
    console.log( person.fullName);
}

let user = new Student("Jane", "M.", "User");
console.log(user.getName())
 greeter(user);

// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
console.log(typeof myName)

interface A {
    ab?: string;
}

interface P extends A {
    abc?: number;
}

let x: A = {ab : ''};
let y: P = { abc : 0, ab : ''};
// let x:A, y:P // undefined
x.ab = 'hr';
y.abc = 10;

console.log(x, y);

interface Box<Type> {
    contents: Type;
}

let box: Box<string>;

interface Apple {
    a : string
}

// Same as '{ contents: Apple }'.
type AppleBox = Box<Apple>;
let AppleBox : AppleBox = {contents : { a : 'hell'} };
console.log(AppleBox)


interface CallOrConstruct {
    (n?: number): string;
    new (s: string): Date;
}
function fn(ctor: CallOrConstruct) {
    console.log(ctor(10));
    console.log(new ctor("10"));
}
fn(Date);
let s = null
console.log(typeof s, s)

interface StringArray {
    [index: number]: string;
}

let myArray: StringArray = ['1st', '2nd', '3rd'];
console.log(myArray[0])