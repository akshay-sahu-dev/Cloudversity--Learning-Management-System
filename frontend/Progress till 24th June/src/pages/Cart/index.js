import { useContext } from "react";
import "./cart.scss";
import Cartitem from "../../components/Cart_Item";
import { StateContext } from "../../stateHandling/contexts/StateContext";
import {
  enrollCourse,
  removeFromCart,
} from "../../stateHandling/utils/serverRequests";
import { AuthContext } from "../../stateHandling/contexts/AuthContext";

function Cart() {
  const {
    dispatch,
    state: { cartItems },
  } = useContext(StateContext);

  const { user } = useContext(AuthContext);

  const deleteFromCart = (id) => {
    console.log("Delete from cart function called");
    removeFromCart(id, user, dispatch);
  };

    const enroll = (id) => {
        enrollCourse(id, user.user.token);
    }

    return (
        <div className="cart">
            <div className="cart__section">
                <h2>Please Review Your Cart and Proceed to Buy</h2>
                < div className="cart__section_item" >
                    {
                        cartItems.length ? cartItems.map((item) => {
                            return <Cartitem item={item} key={item._id} deleteFromCart={deleteFromCart} enroll={enroll}/>
                        }) : "No Items in your cart"
                    }
                </div>
            </div>
        </div>

  );
}

export default Cart;
