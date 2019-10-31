import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import API from './utils/API';

//Stateless Components
import MenuTop from "./components/MenuTop";
import Jumbotron from "./components/Jumbotron";
import AuthModal from "./components/AuthModal";
import WithAuth from './components/WithAuth';

//Pages
import Search from "./pages/Search";
import Profile from "./pages/Profile";

//CSS
import "normalize.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

class App extends Component {

  state = {
    userData: {},
    authenticated: false,
    authModalShow: false,
    viewType: "signin"
  }

  componentDidMount = ()=>{
    //check authentication status
    API.getUserSession().then(res => {
      if (res.data.loggedin) {
        this.setState({
          userData: res.data,
          authenticated: true
        });
      }
    }).catch(err => console.log(err.response.data));
  }

  //show/hide authentication modal
  toggleAuthModalShow = viewType => {
    this.setState({
      authModalShow: !this.state.authModalShow,
      viewType: viewType
    });
  }  

  //handle authentication status
  handleAuthentication = auth => {
    
    this.setState({
      userData: auth.data,
      authenticated: true,
      authModalShow: false
    });
  }

  handleSignOut = () => {
    API.signOut().then(res => {
      this.setState({
        userData: "",
        authenticated: false
      })
    }).catch(err=>console.log(err.response));
  }

  render() {
    return (
      <Router>
        <MenuTop
          toggleAuthModalShow={this.toggleAuthModalShow}
          authenticated={this.state.authenticated}
          userInfo={this.state.userData}
          signOut={this.handleSignOut}
        />
        <Jumbotron />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/profile" component={WithAuth(Profile)}  />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <AuthModal
          handleCloseModal={this.toggleAuthModalShow}
          show={this.state.authModalShow}
          viewType={this.state.viewType}
          handleAuthentication={this.handleAuthentication}
        />
      </Router>
    );
  }
}

export default App;
