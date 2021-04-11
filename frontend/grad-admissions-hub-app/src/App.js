import "./App.css";
import React, { useState, useEffect } from 'react';

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import ApplicantSignup from "./Pages/ApplicantSignup";
import About from "./Pages/About";
import ProfLogin from "./Pages/ProfLogin";
import Submission from "./Pages/Submission";
import Professor from './Pages/Professor';
import Applicant from './Pages/Applicant';
import Profile from './Pages/Profile';
import Navbar from "./Components/Navbar/Navbar";
import Application from './Pages/Application';
import Settings from './Pages/Settings';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

export const UserContext = React.createContext();

const initialUserState = {
  loggedIn: false,
  profile: '',
  id: ''
}

function App() {
  const [userState, setUserState] = useState(initialUserState);

  useEffect(() => {
    async function getAuth() {
      try {
        await Auth.currentSession().then((res) => {
          console.log(res);
          const payload = res.idToken.payload;

          const newUser = {
            loggedIn: true,
            profile: payload.profile,
            id: payload.email
          }
          setUserState(newUser);
        });
      } catch (e) {
        console.log(e);
      }
    }
    getAuth();
  }, [])

  return (
    <UserContext.Provider value={{userState, setUserState}}>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/proflogin" component={ProfLogin} />
            <Route path="/" exact component={Home} />
            <Route path="/applicantSignup" component={ApplicantSignup} />
            <Route path="/submission" component={Submission} />
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} />
            <Route path="/application/:id" component={Application} />
            {/* <Route path="/professor" component={Professor} />
          <Route path="/applicant" component={Applicant} /> */}
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
