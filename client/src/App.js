import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route,Link} from "react-router-dom";
//component import
import LandingPage from "./components/views/LandingPage/LandingPage.js"
import RegisterPage from "./components/views/RegisterPage/RegisterPage.js"
import LoginPage from "./components/views/LoginPage/LoginPage.js"
import Navbar from "./components/views/Navbar/Navbar.js"
import Footer from "./components/views/Footer/Footer.js"
import Auth from './hoc/auth'
//libaray import

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />      
          <Route path="/login" component={Auth(LoginPage, false)} />      
          <Route path="/Navbar" component={Navbar} />      
          <Route path="/Footer" component={Footer} />      
        </Switch>
      </div>
    </Router>
  );
}

export default App;
