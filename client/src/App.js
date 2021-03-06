import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import API from './utils/API';
import io from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';

//CSS
import "normalize.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

//Stateless Components
import MenuTop from "./components/MenuTop";
import AuthModal from "./components/AuthModal";
import WithAuth from './components/WithAuth';
import Footer from './components/Footer';

//Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import Skill from "./pages/Skill";
import Contact from "./pages/Contact";
import About from "./pages/About";

class App extends Component {
  mounted = false;
  state = {
    userData: {},
    authenticated: false,
    authModalShow: false,
    viewType: "signin"
  }

  componentDidMount = () => {
    this.mounted = true;

    const socket = io();
    socket.on("chat_notification", msg => {
      if (msg.userDestinyId === this.state.userData.UserId) {
        let notify = `${msg.chat.user} sent a message`;
        toast.info(notify,{ position: toast.POSITION.BOTTOM_LEFT });  
      }
      
    });

    socket.on("new_contact_notification", msg => {
      if (msg.destinyUserId === this.state.userData.UserId) {
        let notify = `You have a new contact from ${msg.originUserName}`;
        toast.info(notify, { position: toast.POSITION.BOTTOM_LEFT });
      }
    });

    //check authentication status
    API.getUserSession().then(res => {
      if (this.mounted) {
        if (res.data.loggedin) {
          this.setState({
            userData: res.data,
            authenticated: true
          });
        }
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
        <ToastContainer />
        <MenuTop
          toggleAuthModalShow={this.toggleAuthModalShow}
          authenticated={this.state.authenticated}
          userInfo={this.state.userData}
          signOut={this.handleSignOut}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/about" component={About} />
          <Route exact path="/skill/:id" render={props => <Skill userData={this.state.userData} toggleAuthModalShow={this.toggleAuthModalShow} {...props} />} />
          <Route exact path="/profile" component={WithAuth(Profile)} />
          <Route exact path="/profile/:id" component={UserProfile} />
          <Route exact path="/contact/:pagetype" component={WithAuth(Contact)}  />
          <Route exact path="/contact/:pagetype/:id" component={WithAuth(Contact)}  />
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
        <Footer />
      </Router>
    );
  }
}

export default App;
