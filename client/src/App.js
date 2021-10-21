import './App.css';
import SearchPage from "./pages/SearchPage"
import RegistrationPage from './pages/Registration';
import SubmissionPage from './pages/SubmissionPage';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" component={SearchPage} exact={true}></Route>
            <Route path="/registration" component={RegistrationPage}></Route>
            <Route path="/submission" component={SubmissionPage}></Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
