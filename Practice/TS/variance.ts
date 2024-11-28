//Role is a subtype of String
//Role[] is subtype of String[]
//Array<T> is covariant over T
type Role = "Admin" | "User";

function greet(names : string[]) {
    return names
}
let role : Role[] = ["Admin","User"];
greet(role);



function greetAnyone( name: Role) {
    return name;
}
function greetUser(name : string) {
    return name;
}

function check( greetFunc : (names : string) => void ) {
    console.log(greetFunc("Admin"));
}
// As Role is subtype of string
// check() has param function with Role param, but we can pass a function with string params instead as :
check(greetAnyone );// Role params
// both are allowed
check( greetUser);// string params : as it allows super type of Role
// string is contravariant over Role

