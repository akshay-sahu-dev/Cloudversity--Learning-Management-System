import React, {useState, useContext, useReducer} from 'react';
import './login.css';
import { useHistory } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';

function LOGIN_SIGNUP() {

    const [formData, setFormData] = useState({});
    const [LoginMessage, setLoginMessage] = useState("");
    const [SignupMessage, setSignupMessage] = useState("");

    const history = useHistory();
    
    async function googleSuccess(res) {
        console.log("Logged in with Google o Auth...");
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            // dispatch login here
            console.log("Result from google : ", result, "TOKEN from google: ", token);

            history.push('/profile');
        } catch (error) {
            console.log(error)
        }
        
    }

    // function googleError() {
    //     console.log("Google Sign In was unsuccessful. Try again later");
    // }
    const googleError = () => {
        console.log("Google Sign In was unsuccessful. Try again later");
    }

    function handleInputChange(e) {
        setFormData({...formData, [e.target.name]:e.target.value});
        console.log(formData)
        // console.log(input)
    }

    
        console.log("OAUTH CLient ID ==> ", process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID)

// ----------- Function for Sign In ------- /
    function handleLoginSubmit(e) {
        e.preventDefault();
        // console.log("Onsubmit login form: ",e.target);
        const formdata = formData;
        // console.log("Form data: ", formdata)
        fetch("http://localhost:5233/tut/login", 
        {method: "POST",
         mode: 'cors',
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(formdata)})
        .then(res => res.json())
        .then(data => {
            if (data.error){
                console.log("Login failed...", data);
                setLoginMessage(data.error)
                return
            }
            console.log("Data pushed successfully, user logged in", data);
            history.push('/profile')
        })
        .catch(err=>{
            console.log("Error in login",err)
            
        })
        }   

 // ----------- Function for Sign Up ------- /

    function handleSignup(e) {
        e.preventDefault();
        // console.log("Onsubmit login form: ",e.target);
        const formdata = formData;

        if (formData.password !== formData.confirm_password) {
             setSignupMessage("Password Mismatch, please try again");
            return
        }
 
        fetch("http://localhost:5233/tut/signup",
            {
                method: "POST",
                mode: 'cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata)
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log("Signup failed...", data);
                    setSignupMessage(data.error)
                    return
                }
                console.log("Data pushed successfully, user signed up", data);
                setSignupMessage("Successfully Signed up! CLick on Login button")
            })
            .catch(err => {
                console.log("Error in login", err)
                setSignupMessage("Unknown error occurred...")

            })
    }

    function showHidePassword(e) {
        // console.log("show hide icon's parent's parent: ",e.target.parentElement.parentElement)
        if (e.target.className === "bx bx-hide"){
            e.target.className = 'bx bx-show';
            e.target.parentElement.parentElement.querySelector('.field input').setAttribute('type', 'text');
        } else {
            e.target.className = "bx bx-hide";
            e.target.parentElement.parentElement.querySelector('.field input').setAttribute('type', 'password');
        }
    }

    function changeFormMode(e) {
       console.log(e.target.id);
        const wrapper__Area = document.querySelector('#wrapper_Area');
        console.log("Wrapper area: ", wrapper__Area)
        if (e.target.id === 'aside_signUp_Btn'){
            console.log("aside_signup_btn clicked")
            wrapper__Area.classList.add('sign-up__Mode-active')
        }
        if (e.target.id === 'aside_signIn_Btn') {

            console.log("Sign in btn clicked")
            wrapper__Area.classList.remove('sign-up__Mode-active');
        };
    };


    return (
        <>
            <div className="wrapper__area" id="wrapper_Area">
                <div className="forms__area">
                    <form className="login__form" id="loginForm" method="POST" onSubmit={handleLoginSubmit}>
                        
                        <h1 className="form__title">Sign In!</h1>
                        {LoginMessage && <span>{LoginMessage}</span>}
                        <div className="input__group">
                            <label className="field">
                                <input type="text" name="email" placeholder="Enter your email" id="loginEmail" value={formData.email} onChange={handleInputChange}/>
                            </label>
                            <span className="input__icon"><i className="bx bx-user"></i></span>
                            <small className="input__error_message"></small>
                        </div>

                        <div className="input__group">
                            <label className="field">
                                <input type="password" name="password" placeholder="Password" id="loginPassword" value={formData.password} onChange={handleInputChange} />
                            </label>
                            <span className="input__icon"><i className="bx bx-lock"></i></span>
                            <span className="showHide__Icon" onClick={showHidePassword}><i className="bx bx-hide"></i></span>
                            <small className="input__error_message"></small>
                        </div>
                                
                        <div className="form__actions">
                            <label htmlFor="checkboxInput" className="remeber_me">
                                <input type="checkbox" id="checkboxInput" />
                                    <span className="checkmark"></span>
                                    <span> Remember Me</span>
                            </label>
                            <div className="forgot_password">Forgot Password?</div>
                        </div>
                                    
                        <button type="submit" className="submit-button" id="loginSubmitBtn">Sign in</button>
                                    
                        <div className="alternate-login">
                            {/* <div className="link">
                                <i className='bx bxl-google'></i>
                                <span>Google</span>
                            </div> */}
                            <GoogleLogin
                                clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}
                                // buttonText="Login"
                                render={renderProps => (
                                    <div onClick={renderProps.onClick} disabled={renderProps.disabled} className="link">
                                        <i className='bx bxl-google'></i>
                                        <span>Google</span>
                                    </div>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleError}
                                cookiePolicy={"single_host_origin"}
                            />
                        </div>
                    </form>

                    <form className="sign-up__form" id="signUpForm" onSubmit={handleSignup}>
                      
                        <h1 className="form__title">Sign Up!</h1>
                        {SignupMessage && <span>{SignupMessage}</span>}
                        <div className="input__group">
                            <label className="field">
                                <input type="text" name="firstName" placeholder="Enter your first name..." id="signUpfirstName" value={formData.firstName} onChange={handleInputChange}/>
                            </label>
                            <span className="input__icon"><i className="bx bx-user"></i></span>
                            <small className="input__error_message"></small>
                        </div>
                        <div className="input__group">
                            <label className="field">
                                <input type="text" name="lastName" placeholder="Enter your last name..." id="signUplastName" value={formData.lastName} onChange={handleInputChange}/>
                            </label>
                            <span className="input__icon"><i className="bx bx-user"></i></span>
                            <small className="input__error_message"></small>
                        </div>
                        <div className="input__group">
                            <label className="field">
                                <input type="text" name="email" placeholder="Email@example.com" id="signUpEmail" value={formData.email} onChange={handleInputChange}/>
                            </label>
                            <span className="input__icon"><i className="bx bx-at"></i></span>
                            <small className="input__error_message"></small>
                        </div>
                        <div className="input__group">
                            <label className="field">
                                <input type="password" name="password" placeholder="Password123$#%..." id="signUpPassword" value={formData.password} onChange={handleInputChange}/>
                            </label>
                            <span className="input__icon"><i className="bx bx-lock"></i></span>
                            <span className="showHide__Icon"><i className="bx bx-hide" onClick={showHidePassword}></i></span>
                            <small className="input__error_message"></small>
                        </div>
                        <div className="input__group confirm__group">
                            <label className="field">
                                <input type="password" name="confirm_password" placeholder="Confirm Password"
                                    id="signUpConfirmPassword" value={formData.confirm_password} onChange={handleInputChange}/>
                            </label>
                            <span className="input__icon"><i className="bx bx-lock"></i></span>
                            <span className="showHide__Icon"><i className="bx bx-hide" onClick={showHidePassword}></i></span>
                            <small className="input__error_message"></small>
                        </div>
                                        
                        <button type="submit" className="submit-button" id="signUpSubmitBtn">Sign Up</button>
                                       
                        <div className="alternate-login">
                            <div className="link">
                                <i className='bx bxl-google'></i>
                                <span>Google</span>
                            </div>
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
                            <p>To Keep connected with us please login with your personal info</p>
                            <button id="aside_signIn_Btn">Sign In</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LOGIN_SIGNUP;
