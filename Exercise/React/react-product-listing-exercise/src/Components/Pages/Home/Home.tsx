import {useFormInputBox} from "../../Utility/CustomHooks/formInput.tsx";
import {ChangeEvent, FC, useState} from "react";
import "./Home.css";
import useFetch from "../../Utility/CustomHooks/fetchData.tsx";
import ListProducts from "../../Utility/ProductListing/ListProducts.tsx";
import LoadingComponent from "../../Utility/Loader/Spinner.tsx";
import {IFetchedCategories, IFetchedProducts, IProduct, IuseFromInput} from "../../Types/UtilityTypes.tsx";
import {Container, Input} from "reactstrap";
import DropdownComponent from "../../Utility/Dropdown/Dropdown.tsx";
import useDebounce from "../../Utility/CustomHooks/debounce.tsx";

const baseUrl = 'https://dummyjson.com/products';

const Home : FC = () =>{
    const [loading, setLoading] = useState(false);
    const categories : IFetchedCategories = useFetch(`https://dummyjson.com/products/category-list`, updateLoadingStatus);
    const [selectedCategory, setSelectedCategory] = useState("");

    const search : IuseFromInput  = useFormInputBox("");
    const { debounceValue : debouncedSearch, loading : typing} = useDebounce(search.value);
    const query : string = debouncedSearch.length > 0 ? `/search?q=${debouncedSearch}` : '';

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState("20");
    const limitAndSkip = `limit=${limit}&skip=${(currentPage-1)*Number(limit)}`;

    const url = query !== ""
        ? `${baseUrl}${query}&limit=${limit}&skip=${0}`
        : (selectedCategory === ""
            ? `${baseUrl}?${limitAndSkip}`
            : `${baseUrl}/category/${selectedCategory}`) ;

    const paginatedProducts : IFetchedProducts = useFetch(url, updateLoadingStatus);

    const totalPages = Math.ceil( (paginatedProducts?.data?.total?? 0) / Number(limit) );
    const showProducts : IProduct[] | undefined = ( selectedCategory==="" )? paginatedProducts?.data?.products :
        paginatedProducts?.data?.products?.filter((product : IProduct )=> product.category ===selectedCategory);

    function handleInputChange(e : ChangeEvent<HTMLInputElement>) {
        search.onChange(e);
        setCurrentPage(1)
    }
    function updateLoadingStatus(status: boolean){
        setLoading(status);
    }

    return (
        <>
            <Container className="search-container">
                <Input className="search-input" placeholder="Search for products" value={search.value} onChange={handleInputChange} />
                <DropdownComponent baseValue="Select the Category" list={categories?.data} selectedItem={selectedCategory} setSelectedItem={setSelectedCategory} />
            </Container>
            {typing
                ? <LoadingComponent width={100} height={100}/>
                : <ListProducts
                    showProducts={showProducts}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    limit={Number(limit)}
                    setLimit={setLimit}
                    loading={loading}
                />
            }
        </>
    )
}
export default Home;