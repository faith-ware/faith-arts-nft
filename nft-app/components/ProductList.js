import React from 'react'
import ProductItem from './ProductItem'

function ProductList(props) {
    return (
            <div className="column">
                {props.products.map((product) => 
                <ProductItem key={product.id} title={product.title} image={product.image} price={product.price} description={product.description} id={product.id} />
                )}
            </div>
    )
}

export default ProductList
