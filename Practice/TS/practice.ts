let  obj1 = {
    catID : 12,
    MyID : 124,
    name: "Adi",
    myBoolean : false,
    nullOrUndefined : null,
    obj : { a : 1}
}
let  obj2 = {
    catID : 12,
    MyID : 121,
    name: "Adi",
    myBoolean : true,
    nullOrUndefined : undefined,
    obj : { a : 1}
}
let  obj3 = {
    catID : 14,
    MyID : 121,
    name : "",
    myBoolean : true,
    nullOrUndefined : null,
    obj : { a : 34545}
}
interface Result<Type> {
    [key: string]: Type[];
};
function func<Type>(arr : Type[], key : keyof Type) : Result<Type>
{
    // let res = {} as { [key : string] : Type[]};
    let res : Result<Type> = {};
    for(const item of arr){
        let i : string;
        if(item[key] === null) i = "null";
        else if(item[key] === undefined) i = "undefined";
        // else if(typeof item[key]==='object') i = item[key]
        else i = item[key].toString();

        console.log(i)
        if(  !res[i] ) res[i] = []
        res[i].push(item);
    }
    return res;
}
console.log(func([obj1, obj2, obj3], "catID"));
console.log(func([obj1, obj2, obj3], "myBoolean"));
console.log(func([obj1, obj2, obj3], "nullOrUndefined"));
console.log(func([obj1, obj2, obj3], "name"));
console.log(func([obj1, obj2, obj3], "obj"));