import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import GoogleLogin from "react-google-login";
import "./LoginSignup.scss";
import GooglePassword from "../../Googleusercreds/googleuserpassword"; //put this file in .gitignore
import { AUTH } from "../../actionTypes";
import * as api from "../../api";

function LoginSignup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",

  });

  const [isTutor, setIsTutor] = useState(false);
  const [LoginMessage, setLoginMessage] = useState("");
  const [SignupMessage, setSignupMessage] = useState("");

  const history = useHistory();
  const { user, dispatch } = useContext(AuthContext);
  //   if (user) {
  //     history.push("/dashboard");
  //   }

  const googleSuccess = async (res) => {
    console.log("Logged in with Google o Auth...");
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      console.log(
        "Result from google : ",
        result,
        "TOKEN from google: ",
        token
      );

      const {givenName, familyName, email, imageUrl} = result;
      const formdata = {
        firstName: givenName,
        lastName:familyName,
        email,
        password: GooglePassword,
        profileImg: imageUrl
      }


      const {data} = await api.tutor_signIn(formdata);    // removed fetch call and using axios from api folder
      console.log("Data from Tut Login(LoginSignup.js line: 60) ==> ",data);
      if (data.error === "Email not registered") {
        // console.log("Google: Email not registered")
        const { data } = await api.tutor_signUp(formdata);  // removed fetch call and using axios from api folder
        
        if (data.message === "Tutor registered successfully") {
          dispatch({
            type: AUTH,
            payload: {
              name: `${data.tutorInfo.firstName} ${data.tutorInfo.lastName}`,
              imageUrl: `https://ui-avatars.com/api/?name=${data.tutorInfo.firstName}`
            }
          });
        } else {
              setLoginMessage("Error while fetching user data")
        }

      } else {
          dispatch({
            type: AUTH,
            payload: {
              name: `${data.tutorInfo.firstName} ${data.tutorInfo.lastName}`,
              imageUrl: data.tutorInfo.profileImg ? data.tutorInfo.profileImg: `https://ui-avatars.com/api/?name=${data.tutorInfo.firstName}`
            }
          });
        history.push("/dashboard");
        } 
    } catch (error) {
      setLoginMessage("Error in login")
      console.log(error);
    }
  };

  const googleError = () => {
    setLoginMessage("Unknown server issue with Google Login");
    setSignupMessage("Unknown server issue with Google Login");
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // ----------- Function for Sign In ---------- /
  async function handleLoginSubmit(e) {
    e.preventDefault();
    const formdata = formData;
    console.log("Form data: ", formdata);

    // if (isTutor) {============
// ==========================Write logic here
    // }

    // fetch("http://localhost:5233/tut/login", {
    //   method: "POST",
    //   mode: "cors",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formdata),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    const { data } = await api.tutor_signIn(formdata);
    if (data.error) {
      console.log("Login failed...", data);
      setLoginMessage(data.error);
      return;
    }
        // console.log("Data pushed successfully, user logged in", data);
        dispatch({
          type: AUTH,
          payload: {
            name: `${data.tutorInfo.firstName} ${data.tutorInfo.lastName}`,
            imageUrl: `https://ui-avatars.com/api/?name=${data.tutorInfo.firstName}`,
          },
        });
        history.push("/dashboard");
    }

  // ----------- Function for Sign Up ------- /

  function handleSignup(e) {
    e.preventDefault();
    const formdata = formData;

    if (formData.password !== formData.confirm_password) {
      setSignupMessage("Password Mismatch, please try again");
      return;
    }

    fetch("http://localhost:5233/tut/signup", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log("Signup failed...", data);
          setSignupMessage(data.error);
          return;
        }
        console.log("Data pushed successfully, user signed up", data);
        dispatch({
          type: "VERIFY_USER",
          payload: {
            name: `${data.data.firstName} ${data.data.lastName}`,
            imageUrl: `https://ui-avatars.com/api/?name=${data.data.firstName}`,
          },
        });
        setSignupMessage("Successfully Signed up! CLick on Login button");
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log("Error in login", err);
        setSignupMessage("Unknown error occurred...");
      });
  }

  function showHidePassword(e) {
    // console.log("show hide icon's parent's parent: ",e.target.parentElement.parentElement)
    if (e.target.className === "bx bx-hide") {
      e.target.className = "bx bx-show";
      e.target.parentElement.parentElement
        .querySelector(".field input")
        .setAttribute("type", "text");
    } else {
      e.target.className = "bx bx-hide";
      e.target.parentElement.parentElement
        .querySelector(".field input")
        .setAttribute("type", "password");
    }
  }

  function changeFormMode(e) {
    // console.log(e.target.id);
    const wrapper__Area = document.querySelector("#wrapper_Area");
    // console.log("Wrapper area: ", wrapper__Area);
    if (e.target.id === "aside_signUp_Btn") {
      //   console.log("aside_signup_btn clicked");
      wrapper__Area.classList.add("sign-up__Mode-active");
    }
    if (e.target.id === "aside_signIn_Btn") {
      //   console.log("Sign in btn clicked");
      wrapper__Area.classList.remove("sign-up__Mode-active");
    }
  }

  return !user ? (
    <div>
      <div className="wrapper__area" id="wrapper_Area">
        <div className="forms__area">
          <form
            className="login__form"
            id="loginForm"
            method="POST"
            onSubmit={handleLoginSubmit}
          >
            <h1 className="form__title">Sign In!</h1>
            {LoginMessage && <span>{LoginMessage}</span>}
            <div className="input__group">
              <label className="field">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  id="loginEmail"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <span className="input__icon">
                <i className="bx bx-user"></i>
              </span>
              <small className="input__error_message"></small>
            </div>

            <div className="input__group">
              <label className="field">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="loginPassword"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </label>
              <span className="input__icon">
                <i className="bx bx-lock"></i>
              </span>
              <span className="showHide__Icon" onClick={showHidePassword}>
                <i className="bx bx-hide"></i>
              </span>
              <small className="input__error_message"></small>
            </div>

            <div className="form__actions">
              <label htmlFor="checkboxInput" className="remeber_me">
                <input type="checkbox" id="checkboxInput" name="isTutor" value={isTutor} onChange={(e)=>setIsTutor(!isTutor)} />
                <span className="checkmark"></span>
                <span> Remember Me</span>
              </label>
              <div className="forgot_password">Forgot Password?</div>
            </div>

            <button type="submit" className="submit-button" id="loginSubmitBtn">
              Sign in
            </button>

            <div className="alternate-login">

              <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}
                render={(renderProps) => (
                  <div
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="link"
                  >
                    <i className="bx bxl-google"></i>
                    <span>Google</span>
                  </div>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </form>

          <form
            className="sign-up__form"
            id="signUpForm"
            onSubmit={handleSignup}
          >
            <h1 className="form__title">Sign Up!</h1>
            {SignupMessage && <span>{SignupMessage}</span>}
            <div className="input__group">
              <label className="field">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name..."
                  id="signUpfirstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </label>
              <span className="input__icon">
                <i className="bx bx-user"></i>
              </span>
              <small className="input__error_message"></small>
            </div>
            <div className="input__group">
              <label className="field">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name..."
                  id="signUplastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </label>
              <span className="input__icon">
                <i className="bx bx-user"></i>
              </span>
              <small className="input__error_message"></small>
            </div>
            <div className="input__group">
              <label className="field">
                <input
                  type="text"
                  name="email"
                  placeholder="Email@example.com"
                  id="signUpEmail"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <span className="input__icon">
                <i className="bx bx-at"></i>
              </span>
              <small className="input__error_message"></small>
            </div>
            <div className="input__group">
              <label className="field">
                <input
                  type="password"
                  name="password"
                  placeholder="Password123$#%..."
                  id="signUpPassword"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </label>
              <span className="input__icon">
                <i className="bx bx-lock"></i>
              </span>
              <span className="showHide__Icon">
                <i className="bx bx-hide" onClick={showHidePassword}></i>
              </span>
              <small className="input__error_message"></small>
            </div>
            <div className="input__group confirm__group">
              <label className="field">
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  id="signUpConfirmPassword"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                />
              </label>
              <span className="input__icon">
                <i className="bx bx-lock"></i>
              </span>
              <span className="showHide__Icon">
                <i className="bx bx-hide" onClick={showHidePassword}></i>
              </span>
              <small className="input__error_message"></small>
            </div>

            <button
              type="submit"
              className="submit-button"
              id="signUpSubmitBtn"
            >
              Sign Up
            </button>

            <div className="alternate-login">
              <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}
                render={(renderProps) => (
                  <div
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="link"
                  >
                    <i className="bx bxl-google"></i>
                    <span>Google</span>
                  </div>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </form>
        </div>

        <div className="aside__area" id="aside_Area" onClick={changeFormMode}>
          <div className="login__aside-info">
            <h4>Hello</h4>
            <img src="https://d.top4top.io/p_1945xjz2y1.png" alt="side-img" />
            <p>Enter your personal details and start journey with us</p>
            <button id="aside_signUp_Btn">Sign Up</button>
          </div>
          <div className="sign-up__aside-info">
            <h4>Welcome</h4>
            <img src="https://e.top4top.io/p_1945sidbp2.png" alt="side-img" />
            <p>
              To Keep connected with us please login with your personal info
            </p>
            <button id="aside_signIn_Btn">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/dashboard" />
  );
}

export default LoginSignup;
