import React from 'react';
import Cart from '../Cart/Cart';

const ReviewItem = (props) => {
    const {name, seller, price, stock, key} = props.product;
    return (
        <div>
            {
                <div>
                    <p> {name} </p>
                    <h4> {price} </h4>
                    <button
                        onClick={() => props.removeHandle(key)}
                        className = "main-btn">Remove Item
                    </button>
                </div>
            }
        </div>
    );
};

export default ReviewItem;