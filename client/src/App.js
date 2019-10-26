import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import io from "socket.io-client";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Stateless Components
import NavBar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";

//Pages
import Search from "./pages/Search";
import Saved from "./pages/Saved";

//CSS
import "normalize.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  
  componentDidMount = () => {
    
    const socket = io();

    socket.on("book_saved", msg => {
      this.setState({ broadcastMsg: msg });
      toast.info(msg,{
        position: toast.POSITION.BOTTOM_CENTER
      });
    });
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Jumbotron />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/saved" component={Saved} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
