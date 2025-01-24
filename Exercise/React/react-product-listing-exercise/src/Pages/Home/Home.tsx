import {useFormInputBox} from "../../Utility/CustomHooks/formInput.tsx";
import {lazy, Suspense, useState} from "react";
import "./Home.css";
import {Link} from "react-router-dom";
import useFetch from "../../Utility/CustomHooks/fetchData.tsx";

const ListProducts = lazy(() => import("../../Components/ListProducts.tsx"));
const ListCategories = lazy(() => import("../../Components/ListCategories.tsx"));

const Home = () =>{
    const search = useFormInputBox("");
    const [category, setCategory] = useState("all");
    const query = search.value.length > 0 ? `search?q=${search.value}` : '';

    const productData = useFetch(`https://dummyjson.com/products/${query}`);
    const categoryData = useFetch(`https://dummyjson.com/products/category-list`);

    const productDataByCategories = useFetch(`https://dummyjson.com/products/category/${category}`);
    const filterProductsBySearchAndCategory = productDataByCategories?.data?.products?.length > 0?
                                                productDataByCategories?.data?.products?.filter((product)=>{
                                                    return productData?.data?.products?.some((searchProduct)=> searchProduct.id === product.id)
                                                })
                                                : productData?.data?.products ;

    return (
        <>
            <div className="container">
                <h1>Product Listing</h1>
                <div className="search-container">
                    <input type="text" placeholder="Search for products" value={search.value} onChange={search.onChange} className="search-input"/>
                    <div className="category-cart">
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="category-select">
                            <ListCategories categoryData={categoryData?.data}/>
                        </select>
                        <Link to={'cart'}> <h2 className="cart-heading"> <span>User</span>'s Cart</h2> </Link>
                    </div>
                </div>
            </div>
            <Suspense fallback={<div> ...loading</div>}>
                <ListProducts productData={filterProductsBySearchAndCategory}/>
            </Suspense>
        </>
    )
}

export default Home;