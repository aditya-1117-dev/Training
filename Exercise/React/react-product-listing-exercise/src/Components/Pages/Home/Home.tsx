import {useFormInputBox} from "../../Utility/CustomHooks/formInput.tsx";
import {ChangeEvent, FC, useState} from "react";
import "./Home.css";
import useFetch from "../../Utility/CustomHooks/fetchData.tsx";
import ListProducts from "../../Utility/ProductListing/ListProducts.tsx";
import LoadingComponent from "../../Utility/Loader/Spinner.tsx";
import {IFetchedCategories, IFetchedProducts, IProduct, IuseFromInput} from "../../Types/UtilityTypes.tsx";
import {Container, Input} from "reactstrap";
import DropdownComponent from "../../Utility/Dropdown/Dropdown.tsx";

const baseUrl = 'https://dummyjson.com/products';

const Home : FC = () =>{
    const categories : IFetchedCategories = useFetch(`https://dummyjson.com/products/category-list`);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const search : IuseFromInput  = useFormInputBox("");

    const query : string = search.value.length > 0 ? `/search?q=${search.value}` : '';

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState("20");
    const limitAndSkip = `limit=${limit}&skip=${(currentPage-1)*Number(limit)}`;

    const url = query !== ""
        ? selectedCategory !==""? `${baseUrl}${query}`
            : `${baseUrl}${query}&${limitAndSkip}`
        : (selectedCategory === ""
            ? `${baseUrl}?${limitAndSkip}`
            : `${baseUrl}/category/${selectedCategory}`) ;

    const paginatedProducts : IFetchedProducts = useFetch(url, query !== ""? 3000 : 0);

    const totalPages = Math.ceil( (paginatedProducts?.data?.total?? 0) / Number(limit) );

    // limit=n,skip=0 - filter

    const showProducts : IProduct[] | undefined = ( selectedCategory==="" )
        ? paginatedProducts?.data?.products
        : paginatedProducts?.data?.products?.filter((product : IProduct )=> product.category ===selectedCategory);


    function handleInputChange(e : ChangeEvent<HTMLInputElement>) {
        search.onChange(e);
        setCurrentPage(1)
    }

    return (
        <>
            <Container className="search-container">
                <Input className="search-input" placeholder="Search for products" value={search.value} onChange={handleInputChange} />
                <DropdownComponent baseValue="Select the Category" list={categories?.data} selectedItem={selectedCategory} setSelectedItem={setSelectedCategory} />
            </Container>
            {paginatedProducts?.loading
                ? <LoadingComponent width={100} height={100}/>
                : <ListProducts
                    showProducts={showProducts}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    limit={Number(limit)}
                    setLimit={setLimit}
                    loading={paginatedProducts?.loading}
                />
            }
        </>
    )
}
export default Home;