import {useFormInputBox} from "../../Utility/CustomHooks/formInput.tsx";
import {useState} from "react";
import "./Home.css";
import {Link} from "react-router-dom";
import useFetch from "../../Utility/CustomHooks/fetchData.tsx";
import ListCategories from "../../Utility/ListCategories.tsx";
import ListProducts from "../../Utility/ListProducts.tsx";
import LoadingComponent from "../../Utility/Spinner.tsx";


const Home = () =>{
    const search = useFormInputBox("");
    const [category, setCategory] = useState("all");
    const query = search.value.length > 0 ? `search?q=${search.value}` : '';

    const products = useFetch(`https://dummyjson.com/products/${query}`);
    const categories = useFetch(`https://dummyjson.com/products/category-list`);

    const productDataByCategories = useFetch(`https://dummyjson.com/products/category/${category}`);
    const filterProductsBySearchAndCategory = productDataByCategories?.data?.products?.length > 0?
                                                productDataByCategories?.data?.products?.filter((product)=>{
                                                    return products?.data?.products?.some((searchProduct)=> searchProduct.id === product.id)
                                                })
                                                : products?.data?.products ;


    return (
        <>
            <div className="container">
                <h1>Product Listing</h1>
                <div className="search-container">
                    <input type="text" placeholder="Search for products" value={search.value} onChange={(e)=>{search.onChange(e); handleSearching(e);}} className="search-input"/>
                    <div className="category-cart">
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="category-select">
                            {categories.loading ? <option><LoadingComponent width={10} height={10}/></option> :
                                              <ListCategories categories={categories?.data}/>}
                        </select>
                        <Link to={'cart'}> <h2 className="cart-heading"> <span>User</span>'s Cart</h2> </Link>
                    </div>
                </div>
            </div>
            {products.loading ? <LoadingComponent width={100} height={100}/> :
                <ListProducts products={filterProductsBySearchAndCategory}/>}
        </>
    )
}

export default Home;