import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
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
          <IconMenu
            iconButtonElement={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText="Analyze" onClick={this.handleAnalyzeClick.bind(this)} />
            {this.props.login ?
              <div>
                <MenuItem primaryText="Dashboard" />
                <MenuItem primaryText="Log Out" onClick={this.handleLogoutClick.bind(this)} />
              </div>
            :
              <MenuItem><a href="/auth/google">Log In</a></MenuItem>
            }
          </IconMenu>}
      />
    );
  }
}
