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
    return this.props.visible && (
      <div className="padTop">
        <h2 className="center-text">Dashboard</h2>
        <h3 className="center-text">Your Analysis</h3>
        <p className='center-text width700'>
          Below is the average score of all the tones in the articles and text you analyzed and upvoted.
        </p>
        <BubbleChartUpvotes />
        <HistoryTable> default text for history </HistoryTable>
      </div>
    );
  }
}

