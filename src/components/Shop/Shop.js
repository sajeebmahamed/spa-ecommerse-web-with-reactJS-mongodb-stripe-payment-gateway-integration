import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    // const data = fakeData.slice(0,10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect( ()=>{
        fetch('http://localhost:4200/products')
        .then(res => res.json())
        .then(data => {
            console.log('data from database', data);
            setProducts(data);
        })

    }, [])

    useEffect( () => {
        const savedCart = getDatabaseCart();
        const ProductKeys = Object.keys(savedCart);
        if(products.length){
            const previousCart = ProductKeys.map(existingKey => {
                const product = products.find(pd => pd.key === existingKey);
                product.quantity = savedCart[existingKey];
                return Product;
            })
            setCart(previousCart);
        }
    },[products])


    const handleAddProduct = (product) => {

        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart  = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className = "shop-container">
            <div className = "main-product">
                
                {
                    // products.map(pd => <li> {pd.name} </li>)
                    products.map(pd => <Product key = {pd.key} showAddToCart = {true}
                        handleAddProduct = {handleAddProduct}
                         product = {pd}> </Product>)
                }
            </div>
            <div className = "cart">
                <Cart cart = {cart}>
                    <Link to="/review">
                        <button className="main-btn">Review</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;