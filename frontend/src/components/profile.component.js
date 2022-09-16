import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <h2> Email: {currentUser.email}</h2>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
