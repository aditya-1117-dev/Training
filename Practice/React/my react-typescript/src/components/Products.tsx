import React from "react";

interface IProductProp {
    arr : number[]
}
export function Products(props: IProductProp): React.JSX.Element{ // other way to give types
    return (
        <>
            <div>
                <h1>Products</h1>
                {props.arr}
            </div>
            {/*<Home age={"adi"} name={"aditya"}/>*/}
        </>
    )
}

type ThomePropType = {
    name: string,
    age : number,
};

const Home : React.FC<ThomePropType> = ({name, age}:ThomePropType) =>{
    console.log(name, age, typeof age)
    return (
        <>
            <div>
                <h1>Home</h1>
                {/*<Products arr={[1,2,3]}/>*/}
            </div>
        </>
    )
}