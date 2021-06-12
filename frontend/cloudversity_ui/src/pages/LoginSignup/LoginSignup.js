import React, { useContext, useState, useEffect } from "react";
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

  const [isTutor, setIsTutor] = useState(true);
  const [LoginMessage, setLoginMessage] = useState("");
  const [SignupMessage, setSignupMessage] = useState("");
  const [func, setFunc] = useState({});
  const history = useHistory();
  const { user, dispatch } = useContext(AuthContext);
 console.log("User from Auth context (Login Page): ", user);
  useEffect(() => {
    if (isTutor) {

      setFunc({ login: api.tutor_signIn, signup: api.tutor_signUp });

    } else {
      setFunc({ login: api.student_signIn, signup: api.student_signUp });
    }
    
  }, [isTutor, user]);

  

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

      const { givenName, familyName, email, imageUrl } = result;
      const formdata = {
        firstName: givenName,
        lastName: familyName,
        email,
        password: GooglePassword,
        profileImg: imageUrl
      }

      const { data } = await func.login(formdata);    // removed fetch call and using axios from api folder
      console.log("Data from Tut Login(LoginSignup.js line: 60) ==> ", data);
      if (data.error === "Email not registered") {

        const { data } = await func.signup(formdata);

        if (data.message === "Tutor registered successfully" || data.message === "Student registered successfully") {

          const {message, ...payload} = data;
          dispatch({type: AUTH, payload });
        } else {
          setLoginMessage(data.error)
        }

      } else {
        const { message, ...payload } = data;
        dispatch({ type: AUTH, payload });
        history.push("/dashboard");
      }
    } catch (error) {
      setLoginMessage("Google Login wasn't sucessful");
      console.log("Error during google login: ",error);
    }
  };

  const googleError = () => {
    setLoginMessage("Unknown server issue with Google Login");
    setSignupMessage("Unknown server issue with Google Login");
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // ----------- Function for Sign In ---------- /
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formdata = formData;
    console.log("Form data: ", formdata);

    if (isTutor) {
      const { data } = await api.tutor_signIn(formdata);
      if (data.error) {
        console.log("Login failed...", data);
        setLoginMessage(data.error);
        return;
      }
        const {message, ...payload} = data;
        dispatch({
          type: AUTH,
          payload
        });
        history.push("/dashboard");

    } else {
      const { data } = await api.student_signIn(formdata);
      if (data.error) {
        console.log("Login failed...", data);
        setLoginMessage(data.error);
        return;
      }
      const { message, ...payload } = data;
      dispatch({
        type: AUTH,
        payload
      });
      history.push("/dashboard");
    }
    } 

  // ----------- Function for Sign Up ------- /

  const handleSignup = async (e) => {
    e.preventDefault();
    const formdata = formData;

    if (formData.password !== formData.confirm_password) {
      setSignupMessage("Password Mismatch, please try again");
      return;
    }

    try {

      const { data } = await api.tutor_signUp(formdata);
      if (data.error) {
        console.log("Signup failed...", data);
        setSignupMessage(data.error);
        return;
      }
      console.log("Data pushed successfully, user signed up", data);
      dispatch({
        type: AUTH,
        payload: {
          name: `${data.data.firstName} ${data.data.lastName}`,
          imageUrl: `https://ui-avatars.com/api/?name=${data.data.firstName}`,
        },
      });
      setSignupMessage("Successfully Signed up! CLick on Login button");

      setTimeout(()=>{
        history.push("/dashboard");
      }, 1000);  // Redirect user to dashboard after 1s

    } catch (error) {
        console.log("Error in login", error);
        setSignupMessage("Unknown error occurred...");
      }
    }

  const showHidePassword = (e) => {
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

  const changeFormMode = (e) => {
    // console.log(e.target.id);
    const wrapper__Area = document.querySelector("#wrapper_Area");
    if (e.target.id === "aside_signUp_Btn") {
      wrapper__Area.classList.add("sign-up__Mode-active");
    }
    if (e.target.id === "aside_signIn_Btn") {
      wrapper__Area.classList.remove("sign-up__Mode-active");
    }
  }

  return !user?.user ? (
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
