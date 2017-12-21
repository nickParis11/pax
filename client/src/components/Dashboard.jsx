import React from 'react';
import { connect } from 'react-redux';
import  { fetchArticles } from './../actions/dashboardActions.js'
/*
import Nav from './Nav.jsx';
import Input from './Input.jsx';
import Waiting from './Waiting.jsx';
import Results from './Results.jsx';
*/

@connect((store) => {
  return {
    data : store.dashboard.articles,  
    visible : false, // $$$$$$$$$$$$$$$$$$$
    defaultInternalView : true, // $$$$$$$$$$$$$$$$$$$
    errorInternalView : false, // $$$$$$$$$$$$$$$$$$$
    visible : store.user.dashboardView,
    //data : store.dashboard.result,
  };
}) export default class Dashboard extends React.Component {

  componentDidMount() {
    console.log('dashboard mounted');
    this.props.dispatch( fetchArticles() );
  }

  render() {
    console.log('in dashboard');
    return this.props.visible && (
      <div>
        <h1> HEY IN DASHBOARD </h1>
        <h2> {this.props.data} </h2>
      </div>
    );
  }
}
