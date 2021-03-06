import './App.css';
import SearchPage from "./pages/SearchPage"
import RegistrationPage from './pages/Registration';
import LogInPage from './pages/Login';
import SubmissionPage from './pages/SubmissionPage';
import ResultsPage from './pages/ResultsPage';
import SingleResultPage from './pages/SingleResult';

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
            <Route path="/results" component={ResultsPage}></Route>
            <Route path="/single/:id" component={SingleResultPage}></Route>
            <Route path="/login" component={LogInPage}></Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
