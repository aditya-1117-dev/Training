function f1() {
    let b = 50
    return function f() {
        let a=10;

        return function () {
            let b = 10 // shadowing
            console.log(a,b);

        }
    }
}
var a = f1()
console.log( a()() )


const tmp = (function () {
    let a = 0;
    return {
        inc() {
            a++;
        },
        dec() {
            a--;
        },
        val() {
            return a;
        },
    };
})();

console.log(tmp.val());

tmp.inc();
tmp.inc();
console.log(tmp.val());

tmp.dec();
console.log(tmp.val());


const e = 10;
function sum(a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return a + b + c + d + e;
            };
        };
    };
}
console.log(sum(1)(2)(3)(4));