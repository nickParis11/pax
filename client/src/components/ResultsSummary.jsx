import React from 'react';

const ResultsSummary = props => (
  <div className="summaryContainer">
    <p><b><i>{props.title}</i></b>
      <br />
      Overall polarity: <b>{props.polarity}</b><br />
      {props.summary}
    </p>
  </div>
);

export default ResultsSummary;
