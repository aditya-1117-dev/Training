interface IProductProp {
    arr : number[]
}
function Products(props: IProductProp){ // other way to give types
    return (
        <>
            <div>
                <h1>Products</h1>
                {props.arr}
            </div>
        </>
    )
}

function Home(){
    return (
        <>
            <div>
                <h1>Home</h1>
                <Products arr={[1,2,3]}/>
            </div>
        </>
    )
}