// import React, { useContext, useState, useRef, useEffect } from 'react';
import React from 'react';
import Logo from '../../images/logo.png';
import './Header.css';
import { useAuth } from '../Login/useAuth';
// import { auth } from 'firebase';

// const usePrevious = value =>{
//     const prev = useRef();
//     useEffect(() => {
//         // console.log(value);
//         prev.current = value;
//     }, [value])
//     return prev.current;
// }

const Header = () => {    
    const auth = useAuth();
    // console.log(auth.user);  
    // const [count, setCount] = useState(0);
    // const previous = usePrevious(count);
    return (
        <div className = "header-container">
            <div className = "logo">
                <img src={Logo} alt="ema-john-simple" />
                {/* <h1>Count : {count} Previous : {previous} </h1>
                <button onClick = {() => setCount(count+1)} >+</button>
                <button onClick = {() => setCount(count-1)}>-</button> */}
            </div>
            <div className = "nav-bar">
                <nav>
                    <a href="/shop">Shop</a>
                    <a href="/review">Order Review</a>
                    <a href="/inventory">Mangae Inventory</a>
                    {
                        auth.user && <span> {auth.user.name} </span>
                    }
                    {
                        auth.user ? <a href="/login">Sing Out</a>
                        : <a href="/login">Sing In</a>
                    }
                </nav>
            </div>

        </div>
    );
};

export default Header;