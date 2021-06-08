// import logo from './logo.svg';
import './App.css';
import LOGIN_SIGNUP from './Containers/Login-Signup/login-signup';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from './Containers/Profile';
import Home from './Containers/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LOGIN_SIGNUP} />
          <Route exact path="/profile" component={Profile} />

      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
