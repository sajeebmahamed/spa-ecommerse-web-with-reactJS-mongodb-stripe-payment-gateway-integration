import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import './Review.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';
const Review = () => {
    const [cart, setCart] = useState([]);
    const auth = useAuth();

    const handleRemoveItem = (productKey) => {
        // console.log("clicked hyse", productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart =  getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        console.log(productKeys);
        fetch('https://spa-ecommerse-website.herokuapp.com/getProductsByKey', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const cardProducts = productKeys.map(key => {
                const products = data.find(pd => pd.key === key);
                products.quantity = savedCart[key];
                return products;
            });
            setCart(cardProducts);
        })
    },[]);

    return (
        <div className = "review-container">
            <div className = "review">
                {
                    cart.map(pd => <ReviewItem
                        removeHandle={handleRemoveItem}
                        key={pd.key} product={pd}>
                    </ReviewItem>)
                }
                {
                    !cart.length && <h3>Cart is empty now <a href="/shop">Keep Shopping</a> </h3>
                }
            </div>
            <div>
                <Cart cart = {cart}>
                    <Link to= "/shipment">
                        {
                            auth.user ?
                                <button className="main-btn">Process to Checkout</button>
                                :
                                <button className="main-btn">Login to Checkout</button>
                        }
                    </Link>
                </Cart>
            </div>
            
        </div>
        
    );
};

export default Review;