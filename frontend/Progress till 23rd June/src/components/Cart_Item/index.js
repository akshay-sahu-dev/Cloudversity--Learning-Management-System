import React, {useRef} from 'react';
import StripeCheckout from "react-stripe-checkout";
import { coursePayment } from '../../stateHandling/utils/serverRequests';
// const strpKey = "pk_test_51J4ALCSGc5AGfM0B5dMP1YSZkRKPSsZNS19xVVHPmQRdjBUwGjzkhL6wKsaXYXUA5K0uAmUiI0TVZM3CRAFmKgJr00OVZp5Y5k"  // temporarily using this method as .env isn't working
function Cartitem({ item, deleteFromCart, enroll}) {

    const btn = useRef();
    const { _id, courseName, thumbnail, price, authorName: { firstName, lastName }} = item;
    console.log("Process.env: ", process.env);
    const paymentToken = async(token) => {
        try {
            const body = {
                token, ...item
            };
            const paymentStatus = await coursePayment(_id, body)
            
            if (paymentStatus.status === 200) {
                console.log("Payment Status: ", paymentStatus);
                btn.current.innerText = "Payment Success";
                
                setTimeout(()=> {
                    deleteFromCart(_id);
                    enroll(_id);
                }, 1500);

            } else {
                console.log("Error occured during payment");
            };
        } catch (error) {
            console.log("Error occured during payment");
        };
    };

    return (
        <div className="cart__item_container">
            <div className="course_details">
                <div className="thumbnail">
                    <img src={thumbnail} alt={courseName}/>
                </div>
                <div className="course_title">
                    <h4>{courseName}</h4>
                    <p>{`${firstName} ${lastName}`}</p>
                </div>
            </div>
            <div className="price"><i className='bx bx-dollar'></i><p>{price}</p></div>
            <div className="action_buttons">
                <div className="buy_btn">
                    <StripeCheckout
                        stripeKey={process.env.REACT_APP_KEY}
                        // stripeKey={strpKey}
                        token={paymentToken}
                        name="Cloudversity Payments"
                        amount={item.price * 100}
                        shippingAddress
                        billingAddress
                    >
                        <button ref={btn} type="button">Buy @  $ {price}</button>
                    </StripeCheckout>
                    
                </div>
                <div className="remove_from_cart" onClick={() => deleteFromCart(_id)}>
                    <i className='bx bx-trash' ></i>
                </div>
            </div>
        </div>
    )
}

export default Cartitem;
