import React from 'react';
// import fakeData from '../../fakeData';

const Inventory = () => {
    const handleInventor = () =>{
        // const product = fakeData[0];
        // console.log('before post', product);
        // fetch('https://spa-ecommerse-website.herokuapp.com/addProduct', {
        //     method:'POST',
        //     headers:{
        //         'Content-Type' : 'application/json'
        //     },
        //     body: JSON.stringify(fakeData)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log('post successfull', data);
        // })
    }
    return (
        <div>
            <h4>This is Inventory page</h4>
            <button onClick = {handleInventor} >Add Inventor</button>
        </div>
    );
};

export default Inventory;