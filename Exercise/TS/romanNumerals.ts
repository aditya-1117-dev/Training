function romanNumerals(value : number){
    const romanNum: { [key:string]: number} = {
        M: 1000,
        D: 500,
        C: 100,
        L: 50,
        X: 10,
        V: 5,
        I: 1 };
    const reverseRoman = swapKeyValues(romanNum);
    let result : string = '';
    for (let i in romanNum) {
        let count: number = Math.floor( value / romanNum[i]);

        let difference: number = getDifference(romanNum[i]);
        if(value === 4 || value ===9) difference = 1;

        [value, result] = setValueAndResult(value, count * romanNum[i], result, i.repeat(count));
        if (value>= romanNum[i]-difference){
            [value, result] = setValueAndResult(value, romanNum[i] - difference, result, reverseRoman[difference]+ i)
        }
    }
    console.log(result);
}

function swapKeyValues( obj : { [key:string]: number }) : {[key:number]: string} {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [value, key])
    );
}

function getDifference(value : number):number {
    value = Math.floor(value / 10);
    return parseInt(value.toString()) ===5 ? value * 2 : value;
}

function setValueAndResult(value: number, subtractValue : number, result: string, addString : string): [number, string] {
    return [ value - subtractValue, result+addString ];
}

romanNumerals(4001);
romanNumerals(8);
romanNumerals(9);
romanNumerals(39);
romanNumerals(49);
romanNumerals(90);
romanNumerals(85);
romanNumerals(100);
romanNumerals(245);
romanNumerals(489);
romanNumerals(834);
romanNumerals(2454);
romanNumerals(2989);
romanNumerals(3599);
romanNumerals(4909);