import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Navbar from './Components/Navbar/Navbar';
import Provider from './Providers/ApolloProvider';
import { ApolloProvider } from '@apollo/client';


function App() {
  return (
    <Router>
      {/* <Provider> */}
        <div>
          <Navbar/>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
        {/* </Provider> */}
    </Router>
    
  );
}

export default App;
