import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { userLogout, setAnalyzeView, getUser } from '../actions/userActions';

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
        title="Pax Atlantica"
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
          </div>}
      />
    );
  }
}
