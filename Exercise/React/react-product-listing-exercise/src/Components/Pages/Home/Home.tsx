import {useFormInputBox} from "../../Utility/CustomHooks/formInput.tsx";
import { FC, useState} from "react";
import "./Home.css";
import useFetch from "../../Utility/CustomHooks/fetchData.tsx";
import ListCategories from "../../Utility/ListCategories.tsx";
import ListProducts from "../../Utility/ListProducts.tsx";
import LoadingComponent from "../../Utility/Spinner.tsx";
import {IProduct, IuseFetch, IuseFromInput} from "../../../Types/UtilityTypes.tsx";
import {Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input} from "reactstrap";

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

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <>
            <Container className="search-container">
                <Input className="search-input" placeholder="Search for products" value={search.value} onChange={search.onChange} />

                <Dropdown direction="down" isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle caret>Select the category</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem  value="all" onClick={(e) =>setCategory(e.target.value)}> Select Categories</DropdownItem>
                        <ListCategories setCategory={setCategory} categories={categories?.data}/>
                    </DropdownMenu>
                </Dropdown>
            </Container>
            {products.loading ? <LoadingComponent width={100} height={100}/> :
                <ListProducts products={filterProductsBySearchAndCategory}/>}
        </>
    )
}

export default Home;