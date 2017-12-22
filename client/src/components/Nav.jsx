import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { userLogout, getUser } from '../actions/userActions';
import { setAnalyzeView } from '../actions/analyzerActions.js';

@connect((store) => {
  return {
    login: store.user.login,
    loginView: store.user.loginView,
    signup: store.user.signup,
    username: store.user.username,
  };
}) export default class Nav extends React.Component {
  componentWillMount() {
    this.props.dispatch(getUser());
  }

  handleLogoutClick() {
    this.props.dispatch(userLogout());
  }

  handleAnalyzeClick() {
    this.props.dispatch(setAnalyzeView());
  }

  render() {
    return (
      <AppBar
        title={<h1 className="title">Pax Atlantica</h1>}
        iconElementLeft={
          <div>
            <a href="https://github.com/bobdaball" target="_blank">
              <i className="fa fa-lg fa-github ghIcon" />
            </a>
            <a href="https://github.com/dwrz" target="_blank">
              <i className="fa fa-lg fa-github ghIcon" />
            </a>
            <a href="https://github.com/nickParis11" target="_blank">
              <i className="fa fa-lg fa-github ghIcon" />
            </a>
            <a href="https://github.com/cakelyn" target="_blank">
              <i className="fa fa-lg fa-github ghIcon" />
            </a>
          </div>
        }
        iconElementRight={
          <div className="nav">
            <FlatButton label="Analyze" onClick={this.handleAnalyzeClick.bind(this)} />
            {this.props.login ?
              <div>
                <FlatButton label="Dashboard" />
                <FlatButton label="Log Out" onClick={this.handleLogoutClick.bind(this)} />
              </div>
            :
              <FlatButton href="/auth/google" label="Log In" />
            }
          </div>
        }
      />
    );
  }
}
