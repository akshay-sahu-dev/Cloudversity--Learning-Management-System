import { useContext } from 'react';
import "./wishlist.scss";
import Wishlistitem from "../../components/Wishlist_Item";
import { StateContext } from '../../stateHandling/contexts/StateContext';
import { addToCart, removeFromWishList } from '../../stateHandling/utils/serverRequests';
import { AuthContext } from '../../stateHandling/contexts/AuthContext';
function Wishlist() {
    const {
        dispatch, state: { wishListItems },
    } = useContext(StateContext);

    const { user } = useContext(AuthContext)

    const deleteFromWishlist = (id) => {
        console.log("Delete from wishlist function called")
        removeFromWishList(id, user, dispatch);
    };

    const moveToCart = async(id) => {
        const data = await addToCart(id, user, dispatch);
        console.log("Data from addtoCart in Wishlist: ",data)
        removeFromWishList(id, user, dispatch);
    }

    return (
        <div className="wishlist">
            <div className="wishlist__section">
                <h2>Wishlisted Courses</h2>
                < div className="wishlist__section_item" >
                    {
                        wishListItems.length ? wishListItems.map((item) => {
                            return (
                            <Wishlistitem 
                            item={item} 
                            key={item._id} 
                            deleteFromWishlist={deleteFromWishlist} 
                            moveToCart={moveToCart} />
                            )
                        }) : "No Items in your Wishlist"
                    }
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
