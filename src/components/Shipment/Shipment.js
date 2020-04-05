import React from 'react';
// import { useForm, onSubmit } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { getDatabaseCart, clearLocalShoppinCart } from '../../utilities/databaseManager';
import { useAuth } from '../Login/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckOutForm/CheckOutForm';
import { useState } from 'react';

// import Auth from '../Login/useAuth';
const Shipment = () => {
    const { register, handleSubmit, errors } = useForm()
    const [shipInfo, setShipInfo] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const auth = useAuth();
    const stripePromise = loadStripe('pk_test_BPZRRegJm0Y8KuX7nBElSfpq00hLnSTszJ');
    const onSubmit = data => {
        setShipInfo(data);
    }
    const handlePlaceOrder = (payment) => {
        console.log(auth.user.email);
        const savedCart = getDatabaseCart();
        const orderDetails = {
            email: auth.user.email,
            cart: savedCart,
            shipment: shipInfo,
            payment: payment
        };
        fetch('https://spa-ecommerse-website.herokuapp.com/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(order => {
                setOrderId(order._id);
                clearLocalShoppinCart();
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div style = {{ display: shipInfo && 'none' }} className="col-md-6">
                    <h3>Shipment Information</h3>
                    <form className="ship-form" onSubmit={handleSubmit(onSubmit)} >
                        <input name="name" ref={register({ required: true })} placeholder=" Enter Your Name" />
                        {errors.name && <span>Name is required</span>}

                        <input name="email" ref={register({ required: true })} placeholder=" Enter Your Email" />
                        {errors.email && <span>Name is required</span>}

                        <input name="phone" ref={register({ required: true })} placeholder=" Enter Your Phone" />
                        {errors.phone && <span>Name is required</span>}

                        <input name="addressliine1" ref={register({ required: true })} placeholder=" Enter Your addressliine1" />
                        {errors.addressliine1 && <span>Name is required</span>}

                        <input name="addreessline2" ref={register({ required: true })} placeholder=" Enter Your addreessline2" />
                        {errors.addreessline2 && <span>Name is required</span>}

                        <input name="city" ref={register({ required: true })} placeholder=" Enter Your city" />
                        {errors.city && <span>Name is required</span>}

                        <input name="country" ref={register({ required: true })} placeholder=" Enter Your country" />
                        {errors.country && <span>Name is required</span>}

                        <input name="zipcode" ref={register({ required: true })} placeholder=" Enter Your zipcode" />
                        {errors.zipcode && <span>Name is required</span>}

                        <input type="submit" />
                    </form >
                </div>
                <div style = {{display: shipInfo ? 'block' : 'none'}} className="col-md-6">
                    <h3>Payment Information</h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
                    </Elements>
                    <br/>
                    {
                        orderId &&
                        <div>
                            <h3>Thank You for shopping with us</h3>
                            <p>Your order id is : {orderId} </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Shipment;