import { useState, useEffect } from 'react';
import "./cart.scss";
import Cartitem from "../../components/Cart_Item";

function Cart() {
    return (
        <div className="cart">
            <div className="cart__section">
                <h2>Please Review Your Cart And Proceed to Buy</h2>
                <div className="cart__section_item">
                    <Cartitem />
                    <Cartitem />
                    <Cartitem />
                    <Cartitem />

                </div>
            </div>
        </div>
    )
}

export default Cart
