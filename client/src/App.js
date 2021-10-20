import './App.css';
import SearchPage from "./pages/SearchPage"
import RegistrationPage from './pages/Registration';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" component={SearchPage} exact={true}></Route>
            <Route path="/registration" component={RegistrationPage}></Route>
          </Switch>
        </div>
      </Router>
      {/* <div className="App">
        <SearchPage />
      </div> */}
    </>
  );
}

export default App;
