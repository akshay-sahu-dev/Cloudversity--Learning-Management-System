import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { LeftContainer, MainContainer, RightContainer } from "./containers";
import { AuthContext } from "./stateHandling/contexts/AuthContext";
import "./App.scss";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="app">
      <BrowserRouter>
        <LeftContainer />
        <MainContainer />
        {user && <RightContainer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
