import React from 'react';

const ResultsSummary = props => (
  <div className="summaryContainer">
    <p><b><i>Summary </i></b>
      <br />
      Overall polarity: <b>{props.polarity}</b>.
    </p>
  </div>
);

export default ResultsSummary;
