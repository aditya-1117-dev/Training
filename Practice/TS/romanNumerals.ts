// I 1
// V 5
// X 10
// L 50
// C 100
// D 500
// M 1000

function romanNumerals(val : number){
    const romanNum = {
        M: 1000,
        D: 500,
        C: 100,
        L: 50,
        X: 10,
        V: 5,
        I: 1 };

    const reverseRoman = {
        1000: "M",
        500: "D",
        100: "C",
        50: "L",
        10: "X",
        5: "V",
        1: "I"
    };

    let str = '';
    for (let i in romanNum) {
        let q = Math.floor( val / romanNum[i]);
        let diff = Math.floor(romanNum[i] / 10 );
        if(val === 4 || val ===9) diff = 1
        let s = diff.toString();
        let d = parseInt(s[0])
        if(d ===5) diff *= 2;

        val -= q * romanNum[i];
        str += i.repeat(q);

        console.log(val, romanNum[i], diff, i, str)

        if (val>= romanNum[i]-diff){
            str += reverseRoman[diff]+ i
            val -= romanNum[i] - diff;
            continue;
        }
    }
    console.log(str)
}
romanNumerals(4444);
romanNumerals(9999);
romanNumerals(700);
romanNumerals(44);
romanNumerals(19);


// function intToRoman(num: number): string {
//     const romans: { [key: number]: string } = {
//         1: "I",
//         5: "V",
//         10: "X",
//         50: "L",
//         100: "C",
//         500: "D",
//         1000: "M" };
//     let result = "";
//     if (num >= 1000) {
//         result += romans[1000].repeat(Math.floor(num / 1000));
//         num %= 1000;
//     }
//     if (num >= 900) {
//         result += romans[100] + romans[1000];
//         num -= 900;
//     } else if (num >= 500) {
//         result += romans[500];
//         num -= 500;
//     } else if (num >= 400) {
//         result += romans[100] + romans[500];
//         num -= 400;
//     } else {
//         result += romans[100].repeat(Math.floor(num / 100));
//         num %= 100;
//     }
//     // console.log(num, result)
//     if (num >= 90) {
//         result += romans[10] + romans[100];
//         num -= 90;
//     } else if (num >= 50) {
//         result += romans[50];
//         num -= 50;
//     } else if (num >= 40) {
//         result += romans[10] + romans[50];
//         num -= 40;
//     } else {
//         result += romans[10].repeat(Math.floor(num / 10));
//         num %= 10;
//     }
//     // console.log(num, result)
//     if (num === 9) {
//         result += romans[1] + romans[10];
//     } else if (num >= 5) {
//         result += romans[5];
//         num -= 5;
//         result += romans[1].repeat(num);
//     } else if (num === 4) {
//         result += romans[1] + romans[5];
//     } else {
//         result += romans[1].repeat(num);
//     }
//     return result;
// }

// console.log(intToRoman(4994));
// console.log(intToRoman(99));
// console.log(intToRoman(44));
// console.log(intToRoman(8));
// console.log(intToRoman(4444));
// console.log(intToRoman(9999));