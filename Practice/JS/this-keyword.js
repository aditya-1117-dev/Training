let x = this;
console.log(x)

const person1 = {
    fullName: function() {
        console.log(this.hello())
        return this.firstName + " " + this.lastName;
    }
}

const person2 = {
    firstName:"John",
    lastName: "Doe",
    hello: function() {
        return "Hello";
    }
}

// Return "John Doe":
console.log(person1.fullName.call(person2))
// The call() method is a JavaScript function method that allows you to invoke a function and explicitly set the value of this inside that function.

const person = {
    firstName:"John",
    lastName: "Doe",
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}

const member = {
    firstName:"Hege",
    lastName: "Nilsen",
}

let fullName = person.fullName.bind(member);
console.log(fullName());
// With the bind() method, an object can borrow a method from another object.
