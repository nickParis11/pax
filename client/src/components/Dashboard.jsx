import React from 'react';
import { connect } from 'react-redux';
import HistoryTable from './dashboard/historyTable.jsx';
import BubbleChartUpvotes from './BubbleChartUpvotes.jsx';

@connect((store) => {
  return {
    data: store.dashboard.articles,
    visible: store.user.dashboardView,
  };
})

export default class Dashboard extends React.Component {
  render() {
    console.log('in dashboard');
    return this.props.visible && (
      <div className="padTop">
        <h2 className="center-text">Dashboard</h2>
        <h3 className="center-text">The Average score of articles you upvoted</h3>
        <BubbleChartUpvotes />
        <HistoryTable> default text for history </HistoryTable>
      <div>
    );
  }
}

