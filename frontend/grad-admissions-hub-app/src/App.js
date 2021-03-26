import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import ApplicantSignup from "./Pages/ApplicantSignup";
import About from "./Pages/About";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" exact component={Home} />
          <Route path="/applicantSignup" component={ApplicantSignup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
