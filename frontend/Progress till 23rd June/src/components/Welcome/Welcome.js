import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import images from "../../assets/images";
import { StateContext } from "../../stateHandling/contexts/StateContext";
import "./Welcome.scss";

const { back, forward, cart, heart } = images;

export function Welcome({ user: { user } }) {
  const { _id, firstName, lastName, profileImg } = user;
  const history = useHistory();

  const {
    state: { cartItems, wishListItems },
  } = useContext(StateContext);

  return (
    <div className="welcome">
      <div className="welcome__greet">
        <img
          className="welcome__greet--userpic"
          src={
            profileImg
              ? profileImg
              : `https://ui-avatars.com/api/?name=${firstName}+${lastName}`
          }
          alt="user-pic"
        />
        <div className="welcome__greet--username">{`Welcome ${firstName} ${lastName}`}</div>
      </div>
      <div className="welcome__icons">
        {user.role === "student" && (
          <>
            <Link to={`/wishlist/${_id}`}>
            <div className="position">
              <img
                className="welcome__icons-heart"
                src={heart.src}
                alt={heart.alt}
              />
              <p className="welcome__icons-count">{wishListItems.length}</p>
            </div>
            </Link>
            <Link to={`/cart/${_id}`}>
              <div className="position">
                <img
                  className="welcome__icons-cart"
                  src={cart.src}
                  alt={cart.alt}
                />
                <p className="welcome__icons-count">{cartItems.length}</p>
              </div>
            </Link>
          </>
        )}
        <div onClick={history.goBack}>
          <img className="welcome__icons-icon" src={back.src} alt={back.alt} />
        </div>
        <div onClick={history.goForward}>
          <img
            className="welcome__icons-icon"
            src={forward.src}
            alt={forward.alt}
          />
        </div>
        {/* <img className="welcome__notification" src={bell.src} alt={bell.alt} /> */}
      </div>
    </div>
  );
}
