// import logo from './logo.svg';
// import './App.css';
import LOGIN_SIGNUP from './Containers/Login-Signup/login-signup';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Profile from './Containers/Profile';
// import Home from './Containers/Home';

import LeftContainer from "./Containers/LeftContainer";
import MainContainer from "./Containers/MainContainer";
import RightContainer from "./Containers/RightContainer";
import AuthContextProvider from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <BrowserRouter>
          <LeftContainer />
          <MainContainer />
          <RightContainer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

// function App() {
//   return (
//     <BrowserRouter>
//     <div className="App">
      
//       <Switch>
//           <Route exact path="/" component={Home} />
//           <Route exact path="/login" component={LOGIN_SIGNUP} />
//           <Route exact path="/profile" component={Profile} />

//       </Switch>
//       </div>
//     </BrowserRouter>
//   );
// }

export default App;
