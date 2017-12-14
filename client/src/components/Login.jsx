import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { setUsername, setPassword, loginUser, signupUser } from '../actions/userActions';

@connect((store) => {
  return {
    password: store.user.password,
    username: store.user.username,
  };
}) export default class Login extends React.Component {
  handleUserChange(e, i) {
    this.props.dispatch(setUsername(i));
  }

  handlePassChange(e, i) {
    this.props.dispatch(setPassword(i));
  }

  handleLoginClick() {
    this.props.dispatch(loginUser(this.props.username, this.props.password));
  }

  handleSignupClick() {
    this.props.dispatch(signupUser(this.props.username, this.props.password));
  }

  render() {
    return (
      <div>
        <TextField floatingLabelText="Username" onChange={this.handleUserChange.bind(this)} /><br />
        <TextField floatingLabelText="Password" onChange={this.handlePassChange.bind(this)} /><br />
        <RaisedButton label="Log In" onClick={this.handleLoginClick.bind(this)} />
        <RaisedButton label="Sign Up" onClick={this.handleLoginClick.bind(this)} />
      </div>
    );
  }
}
