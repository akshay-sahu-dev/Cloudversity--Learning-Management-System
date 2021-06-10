import LeftContainer from "./containers/LeftContainer";
import MainContainer from "./containers/MainContainer";
import RightContainer from "./containers/RightContainer";
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

export default App;
