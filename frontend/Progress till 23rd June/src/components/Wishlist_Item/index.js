
import { useRef } from 'react';
function Cartitem({ item, deleteFromWishlist, moveToCart }) {

    const btn = useRef();
    const { _id, courseName, thumbnail, price, authorName: { firstName, lastName } } = item;
    

    return (
        <div className="wishlist__item_container">
            <div className="course_details">
                <div className="thumbnail">
                    <img src={thumbnail} alt={courseName} />
                </div>
                <div className="course_title">
                    <h4>{courseName}</h4>
                    <p>{`${firstName} ${lastName}`}</p>
                </div>
            </div>
            <div className="price"><i className='bx bx-dollar'></i><p>{price}</p></div>
            <div className="action_buttons">
                <div ref={btn} className="add_to_cart" onClick={() => moveToCart(_id)}>
                    <i className='bx bxs-cart-add'></i>
                </div>
                <div className="remove_from_wishlist" onClick={() => deleteFromWishlist(_id)}>
                    <i className='bx bxs-heart' ></i>
                </div>
            </div>
        </div>
    )
}

export default Cartitem;
