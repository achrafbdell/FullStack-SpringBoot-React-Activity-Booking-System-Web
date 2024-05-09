import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile"; 
import ActivityList from "./components/ActivityAdmin";

function App() {
  return (
    <Router>
      <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} /> 
            <Route exact path="/admin/activities" component={ActivityList} />
          </Switch>
       
    </Router>
  );
}

export default App;
