import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { userLogout, getUser, setView } from '../actions/userActions';

@connect((store) => {
  return {
    login: store.user.login,
    loginView: store.user.loginView,
    signup: store.user.signup,
    username: store.user.username,
    success: store.analyzer.success,
    waiting: store.analyzer.waiting,
    noSearchSoFar: store.analyzer.init,

  };
}) export default class Nav extends React.Component {
  componentWillMount() {
    this.props.dispatch(getUser());
  }

  handleLogoutClick() {
    this.props.dispatch(userLogout());
  }

  handleResultsClick() {
    this.props.dispatch(setView('SET_RESULT_VIEW'));
  }

  handleAboutClick() {
    this.props.dispatch(setView('SET_ABOUT_VIEW'));
  }

  handleAnalyzeClick() {
    this.props.dispatch(setView('SET_ANALYZE_VIEW'));
  }

  handleDashboardClick() {
    this.props.dispatch(setView('SET_DASHBOARD_VIEW'));
  }

  handleKeyEntry(e) {
    e.preventDefault();
  }

  render() {
    return (
      <AppBar
        title={<span role="button" className="title" tabIndex="0" onClick={this.handleAnalyzeClick.bind(this)} onKeyUp={this.handleKeyEntry.bind(this)}>Pax Atlantica</span>}
        showMenuIconButton={false}
        iconElementRight={
          <div className="nav">

            <FlatButton label="Analyze" onClick={this.handleAnalyzeClick.bind(this)} />
            <FlatButton label="About" onClick={this.handleAboutClick.bind(this)} />
            {
              !this.props.waiting && !this.props.noSearchSoFar ? <FlatButton label="Results" onClick={this.handleResultsClick.bind(this)} /> : null
            }
            {this.props.login ?
              <div>

                <FlatButton label="Dashboard" onClick={this.handleDashboardClick.bind(this)} />
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
