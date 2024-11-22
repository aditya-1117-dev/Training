(function(){
    var a = new Promise((resolve, reject) =>{
        let b = 1+2;
        if(b == 2){
            resolve("Success")
        }else {
            reject("Failed")
        }
    });
})();

{
    var a1 = new Promise((resolve, reject) =>{
        let b = 1+2;
        if(b === 3){
            resolve("Success")
        }else {
            setTimeout(()=>{
                console.log("1st")
                reject("1st Failed")
                },3000
            )
        }
    });

    var a2 = new Promise((resolve, reject) =>{
        let b = 1+2;
        if(b === 2){
            resolve("Success")
        }else {
            setTimeout(()=>{
                    console.log("2nd")
                },3000
            )
            reject("2nd Failed")
        }
    });

    var a3 = new Promise((resolve, reject) =>{
        let b = 1+2;
        if(b === 2){
            resolve("Success")
        }else {
            reject("3rd Failed")
        }
    });
}
console.log(typeof a1)
console.log(a1 , a2 , a3)

a1.then(()=> {
        return new Promise((resolve, reject) => {
            let b = 1 + 2;
            if (b === 2) {
                resolve("1st Chained")
            } else {
                setTimeout(() => {
                        console.log("1st Chained")
                        reject("1st chained Failed")
                    }, 3000
                )
            }
        });
    return "Empty"
    }
)
    .then(console.log )
    .catch((res) => console.log(res) )

a2.then((res) => console.log(res))
    .catch((res) => console.log(res) );

a3.then( console.log )
    .catch((res) => console.log(res) );


