import {useFormInputBox} from "../../Utility/CustomHooks/formInput.tsx";
import { FC, useState} from "react";
import "./Home.css";
import useFetch from "../../Utility/CustomHooks/fetchData.tsx";
import ListProducts from "../../Utility/ListProducts.tsx";
import LoadingComponent from "../../Utility/Spinner.tsx";
import {IProduct, IuseFetch, IuseFromInput} from "../../Types/UtilityTypes.tsx";
import {Container, Input} from "reactstrap";
import DropdownComponent from "../../Utility/Dropdown.tsx";

function findIntersection(productsToFilter : IProduct[], productsToCheck : IProduct[]) {
    return (
        productsToFilter?.length > 0 ?
            productsToFilter.filter( (product : IProduct) => productsToCheck?.some( (searchProduct) => searchProduct.id === product.id) )
            : productsToCheck
    )
}

const Home : FC = () =>{
    const search : IuseFromInput  = useFormInputBox("");
    const [category, setCategory] = useState("all");
    const query : string = search.value.length > 0 ? `search?q=${search.value}` : '';
    const products : IuseFetch= useFetch(`https://dummyjson.com/products/${query}`);
    const categories : IuseFetch = useFetch(`https://dummyjson.com/products/category-list`);
    const productDataByCategories : IuseFetch = useFetch(`https://dummyjson.com/products/category/${category}`);
    const filterProductsBySearchAndCategory : IProduct[] = findIntersection(productDataByCategories?.data?.products, products?.data?.products);

    return (
        <>
            <Container className="search-container">
                <Input className="search-input" placeholder="Search for products" value={search.value} onChange={search.onChange} />
                <DropdownComponent list={categories?.data} setter={setCategory}/>
            </Container>
            {products.loading ? <LoadingComponent width={100} height={100}/> :
                <ListProducts products={filterProductsBySearchAndCategory}/>}
        </>
    )
}

export default Home;