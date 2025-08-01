import {useFormInputBox} from "../../Utility/CustomHooks/formInput.tsx";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import "./Home.css";
import useFetch from "../../Utility/CustomHooks/fetchData.tsx";
import ListProducts from "../../Components/ProductListing/ListProducts.tsx";
import {IFetchedCategories, IFetchedProducts, IProduct, IuseFromInput} from "../../Types/UtilityTypes.tsx";
import {Container, Input} from "reactstrap";
import DropdownItems from "../../Components/Dropdown/DropdownItems.tsx";

const baseUrl = 'https://dummyjson.com/products';

function findUrl(query : string, category : string, limitAndSkip? : string) {
    return query !== ""
        ? category !==""? `${baseUrl}${query}&limit=0&skip=0`
            : `${baseUrl}${query}&${limitAndSkip}`
        : (category === ""
            ? `${baseUrl}?${limitAndSkip}`
            : `${baseUrl}/category/${category}?${limitAndSkip}`) ;
}

function filterByKey( array1 : IProduct[] | undefined, key: keyof IProduct, value : string) {
    return ( value==="" )
        ? array1
        : array1?.filter((product : IProduct )=> product[key] === value);
}

const Home = ({setProducts} : {setProducts : Dispatch<SetStateAction<IProduct[]>>}) =>{
    const categories : IFetchedCategories = useFetch(`https://dummyjson.com/products/category-list`);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const search : IuseFromInput  = useFormInputBox("");
    const query : string = search.value.length > 0 ? `/search?q=${search.value}` : '';

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(2);
    const limitAndSkip = `limit=${limit}&skip=${(currentPage-1)*limit}`;
    const url = findUrl(query, selectedCategory, limitAndSkip);
    const paginatedProducts : IFetchedProducts = useFetch(url, query !== ""? 1000 : 0);
    const localStorageProducts = JSON.parse(localStorage.getItem('products') || '[]')
        .map( (product : any) => {
            return  { ...product, quantity : 0 }
        } );
    const totalPages = Math.ceil( (paginatedProducts?.data?.total?? 0) / limit );

    const products : IProduct[] | undefined = filterByKey( paginatedProducts?.data?.products, "category", selectedCategory);
    function handleInputChange(e : ChangeEvent<HTMLInputElement>) {
        search.onChange(e);
        setCurrentPage(1);
    }

    function handleCategoryChange(value : string) {
        setSelectedCategory(value);
        setCurrentPage(1);
    }

    return (
        <>
            <Container className="search-container">
                <Input className="search-input" placeholder="Search for products" value={search.value} onChange={handleInputChange} />
                <DropdownItems baseValue="Select the Category" list={categories?.data} selectedItem={selectedCategory} setSelectedItem={handleCategoryChange} />
            </Container>
            <ListProducts
                products={currentPage===1 && products
                    ? [...localStorageProducts , ...products]
                    : products}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                limit={limit}
                setLimit={setLimit}
                loading={paginatedProducts?.loading}
                setProducts={setProducts}
            />
        </>
    )
}
export default Home;