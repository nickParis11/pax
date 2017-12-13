import React from 'react';
import { connect } from 'react-redux';
import { setLoginView, setAnalyzeView } from '../actions/userActions.js';

@connect((store) => {
  return {
    login: store.user.login,
    loginView: store.user.loginView,
    signup: store.user.signup,
  }
})

export default class Nav extends React.Component {

  handleLogoutClick() {
    // show logout view
  }

  handleLoginClick() {
    this.props.dispatch(setLoginView());
  }

  handleAnalyzeClick() {
    this.props.dispatch(setAnalyzeView());
  }

  render() {
    return(
      <div>
        <h1>Pax Atlantica</h1>
        <button onClick={this.handleAnalyzeClick.bind(this)}>Analyze</button>
        {this.props.login ?
          <button onClick={this.handleLogoutClick.bind(this)}>Log out</button>
        :
          <button onClick={this.handleLoginClick.bind(this)}>Log in</button>
        }
      </div>
    )
  }
}