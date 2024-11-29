//
let a = async () => {
    let res = await fetch("https://dummyjson.com/products")
    let data = await res.json();
    console.log(data)
}
a();
//
// console.log('kk')

// let obj ={
//     name : 'Aditya',
//     location : "Pune",
//     address : {
//         country : 'India'
//     }
// }
//
// let handle = {
//     get
//     // set(obj , par, obj2){
//     //     return "world";
//     // }
// }
//
// let obj2 = new Proxy(obj, handle);
//
// obj2.name = "Shreyash";
// obj2.address.country = 'Aus'
//
// console.log(obj.name)
// console.log(obj2.name)
// console.log(obj.address.country)
// console.log(obj2.address.country)

