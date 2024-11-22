function f2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function f1() {
    console.log('calling');
    const res = await f2();
    console.log(res);
}

f1();

const fruitBasket = {
    apple: 27,
    grape: 0,
    pear: 14,
}

const sleep = ms => {
    return new Promise(resolve => setTimeout(()=>{
        resolve("Hello")
    }, ms))
}

const getNumFruit = fruit => {
    return sleep(5000).then(v => {
        console.log(v)
        return fruitBasket[fruit];
    })
}

getNumFruit('apple').then(num => console.log(num)) // 27

const control = async _ => {
    console.log('Start')

    const numApples = await getNumFruit('apple')
    console.log(numApples)

    const numGrapes = await getNumFruit('grape')
    console.log(numGrapes)

    const numPears = await getNumFruit('pear')
    console.log(numPears)

    console.log('End')
}
control()

const fruitsToGet = ['apple', 'grape', 'pear']
const forLoop = async _ => {
    console.log('Start')

    for (let index = 0; index < fruitsToGet.length; index++) {
        const fruit = fruitsToGet[index]
        const numFruit =  await getNumFruit(fruit)
        console.log(numFruit)
    }

    console.log('End')
}
forLoop()

const forLoop = async _ => {
    console.log('Start')
    const promises = [];
    for (let index = 0; index < fruitsToGet.length; index++) {
        const fruit = fruitsToGet[index]
        promises.push(getNumFruit(fruit))
        console.log(promises)
    }
    const ans = await Promise.all(promises);
    console.log(ans)
    console.log('End')
}
forLoop()

