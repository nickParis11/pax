import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { setLoginView, setAnalyzeView } from '../actions/userActions';

@connect((store) => {
  return {
    login: store.user.login,
    loginView: store.user.loginView,
    signup: store.user.signup,
  };
}) export default class Nav extends React.Component {
  handleLogoutClick() {
    // show logout view
    this.props.dispatch(setLoginView());
  }

  handleLoginClick() {
    this.props.dispatch(setLoginView());
  }

  handleAnalyzeClick() {
    this.props.dispatch(setAnalyzeView());
  }

  render() {
    return (
      <AppBar
        title="Pax Atlantica"
        iconElementRight={
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Analyze" onClick={this.handleAnalyzeClick.bind(this)} />
          {this.props.login ?
            <MenuItem primaryText="Log Out" onClick={this.handleLogoutClick.bind(this)} />
          :
            <MenuItem primaryText="Log In" onClick={this.handleLoginClick.bind(this)} />
          }
        </IconMenu>}
      />
    );
  }
}
