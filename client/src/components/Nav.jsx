import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { userLogout, setAnalyzeView, getUser, setView } from '../actions/userActions';

@connect((store) => {
  return {
    login: store.user.login,
    loginView: store.user.loginView,
    signup: store.user.signup,
    username: store.user.username,
    success: store.analyzer.success,
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

  handleAnalyzeClick() {
    // this.props.dispatch(setAnalyzeView());
    this.props.dispatch(setView('SET_ANALYZE_VIEW'));
  }

  handledashboardClick() {
    this.props.dispatch(setView('SET_DASHBOARD_VIEW'));// $$$$$$$$$$$$$$$$$$$$$$$$$ to check
  }

  render() {
    return (
      <AppBar
        title={<h1 className="title">Pax Atlantica</h1>}
        iconElementLeft={
          <div>
            <a href="https://github.com/bobdaball" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-lg fa-github ghIcon" />
            </a>
            <a href="https://github.com/dwrz" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-lg fa-github ghIcon" />
            </a>
            <a href="https://github.com/nickParis11" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-lg fa-github ghIcon" />
            </a>
            <a href="https://github.com/cakelyn" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-lg fa-github ghIcon" />
            </a>
          </div>
        }
        iconElementRight={
          <div className="nav">
            <FlatButton label="Analyze" onClick={this.handleAnalyzeClick.bind(this)} />
            {this.props.login ?
              <div>
                {
                    this.props.success ? <FlatButton label="Results" onClick={this.handleResultsClick.bind(this)} /> : null
                  }
                <FlatButton label="Dashboard" onClick={this.handledashboardClick.bind(this)} />
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
