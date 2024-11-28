class aditya<Type>{
    var1 : string = "Aditya"
    readonly var2 : number|string|undefined


    constructor(public var3? : Type) {

    }
    getVar3 = () => this.var3;

    setValues(var1: string, var3?:Type){
        this.var1 = var1;
        this.var3 = var3;
    }
    // setValues(var1: string){
    //     this.var1 = var1;
    // }
}

class adi extends aditya<number>{
    setValues(var1: string, var3: number) {
        // super.setValues(var1, var3);
        this.var3 = var3;
        this.var1 = var1;
    }
}

const obj = new aditya<string>();
console.log(obj.getVar3() )

function func<T extends { pc }>(x : T): T["pc"] {
    return x.pc;
}
console.log(func({pc:"hello"}))

const obj2 = new adi();
obj2.setValues("Shreyas",13);
console.log(obj2.getVar3() )