import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import ApplicantSignup from "./Pages/ApplicantSignup";
import About from "./Pages/About";
import ProfLogin from "./Pages/ProfLogin";
import Submission from "./Pages/Submission";
import Review from "./Pages/Review";
import Professor from './Pages/Professor';
import Applicant from './Pages/Applicant';
import Profile from './Pages/Profile';
import Navbar from "./Components/Navbar/Navbar";
import Application from './Pages/Application';


import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/proflogin" component={ProfLogin} />
          <Route path="/" exact component={Home} />
          <Route path="/applicantSignup" component={ApplicantSignup} />
          <Route path="/submission" component={Submission} />
          <Route path="/review" component={Review} />
          <Route path="/profile" component={Profile} />
          <Route path="/application/:id" component={Application} />
          {/* <Route path="/professor" component={Professor} />
          <Route path="/applicant" component={Applicant} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
