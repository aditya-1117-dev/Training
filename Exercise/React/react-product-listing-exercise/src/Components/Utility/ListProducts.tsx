import {IProduct} from "../../Types/UtilityTypes.tsx";

export default function ListProducts({ products} : { products : IProduct[]}) {
    return (
        <div className="product-list">
            {products &&
                products.map((product) => {
                    return (
                        <div key={product.id} className="product-item">
                            <img src={product.thumbnail} alt={product.title} className="product-img"/>
                            <div className="product-details">
                                <h5>{product.title}</h5>
                                <p className="product-category">{product.category}</p>
                                <p className="product-description">{product.description.slice(0, 90)}{product.description.length>90? "...": ""}</p>
                            </div>
                            <div className="product-details">
                                <p className="product-price">
                                    <span>${(product.price - (product.price * product.discountPercentage / 100)).toFixed(3)}</span>
                                    <s>(${product.price})</s></p>
                                <button className="add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}