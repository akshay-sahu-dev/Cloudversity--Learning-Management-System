import React from 'react';

function Cartitem() {
    return (
        <div className="cart__item_container">
            <div className="course_details">
                <div className="thumbnail">
                    <img src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="course_thumbail" height="60"/>
                </div>
                <div className="course_title">
                    <h4>This is the title</h4>
                    <p>Author name</p>
                </div>
            </div>
            <div className="price"><p>$25</p></div>
            <div className="action_buttons">
                <div className="buy_btn">
                    <button >Proceed to Buy</button>
                </div>
                <div className="remove_from_cart">
                    <i class='bx bx-trash' ></i>
                </div>
            </div>
        </div>
    )
}

export default Cartitem;
