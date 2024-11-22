const t = {
    m1: "msg 1",
    m2: "msg 2",
};

const h1 = {};

const h1 = {
    get(target, prop, receiver) {
        return "world";
    },
};


const proxy1 = new Proxy(t, h1);

console.log(proxy1.m1, proxy1.m2)


const handler = {
    get(obj, prop) {
        return prop in obj ? obj[prop] : 37;
    },
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 1, undefined

console.log("c" in p, p.c); // false, 37


const products = new Proxy(
    {
        browsers: ["Firefox", "Chrome"],
    },
    {
        get(obj, prop) {
            // An extra property

            if (prop === "latestBrowser") {
                return obj.browsers[obj.browsers.length - 1];
            }

            // The default behavior to return the value
            return obj[prop];
        },
        set(obj, prop, value) {
            // An extra property
            console.log(obj, prop, value)
            if (prop === "latestBrowser") {
                obj.browsers.push(value);
                return true;
            }

            // Convert the value if it is not an array
            if (typeof value === "string") {
                value = [value];
            }

            // The default behavior to store the value
            obj[prop] = value;

            // Indicate success
            return true;
        },
    },
);

console.log(products.browsers);
//  ['Firefox', 'Chrome']

products.browsers = "Safari";
//  pass a string (by mistake)

console.log(products.browsers);
//  ['Safari'] <- no problem, the value is an array

products.latestBrowser = "Edge";

console.log(products.browsers);
//  ['Safari', 'Edge']

console.log(products.latestBrowser);
//  'Edge'
