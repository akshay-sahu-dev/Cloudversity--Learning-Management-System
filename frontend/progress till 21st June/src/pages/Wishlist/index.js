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
        await addToCart(id, user.user.token);
        removeFromWishList(id, user, dispatch);
    }

    return (
        <div className="wishlist">
            <div className="wishlist__section">
                <h2>Wishlisted Courses</h2>
                < div className="wishlist__section_item" >
                    {
                        wishListItems.map((item) => {
                            return (
                            <Wishlistitem 
                            item={item} 
                            key={item._id} 
                            deleteFromWishlist={deleteFromWishlist} 
                            moveToCart={moveToCart} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
