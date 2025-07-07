import React from "react";

interface IProductProp {
    arr : number[]
}
function Products(props: IProductProp): React.JSX.element{ // other way to give types
    return (
        <>
            <div>
                <h1>Products</h1>
                {props.arr}
            </div>
        </>
    )
}

type homePropType = object;

const Home : React.FC<homePropType> = (props) =>{
    return (
        <>
            <div>
                <h1>Home</h1>
                <Products arr={[1,2,3]}/>
            </div>
        </>
    )
}