import React from 'react';
import './Cart.css';
const Cart = (props) => {
    const cart = props.cart;
    // const auth = useAuth();
    // console.log(auth.user);
    // const total = cart.reduce((total, prd) => total + prd.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    const formatNum = num => {
        const precisions = num.toFixed(2);
        return Number(precisions);
    }
    let shippingCost = 0;
    if (total > 200) {
        shippingCost = 0;
    }
    else if (total > 100) {
        shippingCost = 5.99;
    }
    else if (total > 0) {
        shippingCost = 12.99;
    }

    const tax = formatNum(total / 10);

    return (
        <div className = "main-cart">
            <p>Total Item : {cart.length}</p>
            <p>Total Price  : {formatNum(total)}</p>
            <p><small> Shipping Cost : {shippingCost} </small></p>
            <p><small>Tax + Vat : {tax}</small></p>
            <p>Grand Total : {formatNum(total + shippingCost + tax)}</p>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;