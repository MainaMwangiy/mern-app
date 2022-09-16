import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { logout } from "./actions/auth";

import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/user.component";
import BoardModerator from "./components/moderator.component";
import BoardAdmin from "./components/admin.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  logOut() {
    this.props.dispatch(logout());
  }
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to="/" className="nav-brand">
              fastlinker
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>
              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to="/mod" className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">
                    Admin
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to="/user" className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Log Out
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/create-new-user" className="nav-link">
                    Register
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <div className="container mt-3">
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/home" element={<Home/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/create-new-user" element={<Register/>}/>
              <Route exact path="/profile" element={<Profile/>}/>
              <Route path="/user" element={<BoardUser/>}/>
              <Route path="/mod" element={<BoardModerator/>}/>
              <Route path="/admin" element={<BoardAdmin/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state){
  const {user} =  state.auth
  return {
    user
  }
}

export default connect(mapStateToProps)(App);
