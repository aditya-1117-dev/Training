import {useFormInputBox} from "../../Utility/CustomHooks/formInput.tsx";
import { FC, useState} from "react";
import "./Home.css";
import useFetch from "../../Utility/CustomHooks/fetchData.tsx";
import ListProducts from "../../Utility/ProductListing/ListProducts.tsx";
import LoadingComponent from "../../Utility/Loader/Spinner.tsx";
import { IuseFetch, IuseFromInput} from "../../Types/UtilityTypes.tsx";
import {Container, Input} from "reactstrap";
import DropdownComponent from "../../Utility/Dropdown/Dropdown.tsx";
import useDebounce from "../../Utility/CustomHooks/debounce.tsx";


const Home : FC = () =>{
    const search : IuseFromInput  = useFormInputBox("");
    const { debounceValue : debouncedSearch, loading : typing} = useDebounce(search.value);
    const query : string = debouncedSearch.length > 0 ? `/search?q=${debouncedSearch}` : '';
    const [selectedCategory, setSelectedCategory] = useState("");
    const products : IuseFetch= useFetch(`https://dummyjson.com/products${query}`);
    const categories : IuseFetch = useFetch(`https://dummyjson.com/products/category-list`);
    const [limit, setLimit] = useState("10");

    return (
        <>
            <Container className="search-container">
                <Input className="search-input" placeholder="Search for products" value={search.value} onChange={search.onChange} />
                <DropdownComponent baseValue="Select the Category" list={categories?.data} selectedItem={selectedCategory} setSelectedItem={setSelectedCategory} />
            </Container>
            {products.loading || typing ? <LoadingComponent width={100} height={100}/> :
                <ListProducts products={products?.data?.products} query={query} selectedItem={selectedCategory} limit={Number(limit)} setLimit={setLimit}/>}
        </>
    )
}

export default Home;