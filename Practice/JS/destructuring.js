const x = {
    a : 1,
    b : 3,
    c : 5,
    d : 10
};
const {a,b, ...tt} = x;
console.log(a,b,tt)

console.log(x);
if (Math.random() > 0.5) {
    var x = 1;
} else {
    var x = 2;
}

// Rest Params
function abc(m, ...args) {
    return args.map((e) => m * e);
}
const ar = abc(2, 15, 25, 42);
console.log(ar);

// Spread Operator
function myFunction(v, w, x, y, z) {}
const args = [0, 1];
myFunction(-1, ...args, 2, ...[3]);
