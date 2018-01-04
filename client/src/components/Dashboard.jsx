import React from 'react';
import { connect } from 'react-redux';
import HistoryTable from './dashboard/historyTable.jsx'
import BubbleChartUpvotes from './BubbleChartUpvotes.jsx';

@connect((store) => {
  return {
    data: store.dashboard.articles,
    visible: false, // $$$$$$$$$$$$$$$$$$$
    defaultInternalView: true, // $$$$$$$$$$$$$$$$$$$
    errorInternalView: false, // $$$$$$$$$$$$$$$$$$$
    visible: store.user.dashboardView,
  };
})

export default class Dashboard extends React.Component {
  render() {
    console.log('in dashboard');
    return this.props.visible && (
      <div>
        <BubbleChartUpvotes />
        <h1> HEY IN DASHBOARD </h1>
        <HistoryTable> default text for history </HistoryTable>
      </div>
    );
  }
}

//        <Test/>
/*
<ol>
  {
    this.props.data.map(article=>
      <li> {article.result} |||||
      {
       article.user_text.length > 20 ? article.user_text.slice(0,20)+ '...' : article.user_text
      }
      ||||||   {article.is_link ? 'Link search' : 'text search' } </li>
    )
  }
</ol>
*/
