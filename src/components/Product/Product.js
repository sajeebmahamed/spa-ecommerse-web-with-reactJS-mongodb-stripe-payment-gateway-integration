import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    const { name, seller, img, price, stock, key } = props.product;
    // console.log(props);
    return (
        <div className="product-container">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-info">
                <h3 style={{ color: 'darkblue' }} > <Link to={"/product/" + key} >{name}</Link> </h3>
                <br />
                <p><small> by : {seller} </small></p>
                <h3> ${price} </h3>
                <p><small> Only {stock} left in a stock - order soon  </small></p>
                {props.showAddToCart && <button
                    onClick={() => props.handleAddProduct(props.product)}
                    className="main-btn">add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;