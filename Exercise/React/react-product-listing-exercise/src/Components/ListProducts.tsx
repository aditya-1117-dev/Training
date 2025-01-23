
export default function ListProducts({productData}) {

    return (
        <div className="product-list">
            {productData.data && productData.data.products &&
                productData.data.products.map((product) => {
                    return (
                        <div key={product.id} className="product-item">
                            <img src={product.thumbnail} alt={product.title} className="product-img"/>
                            <div className="product-details">
                                <h5>{product.title}</h5>
                                <p className="product-description">{product.description}</p>
                                <p className="product-price"> ${product.price}</p>
                                <button className="add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}