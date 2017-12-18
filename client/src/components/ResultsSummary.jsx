import React from 'react';

const ResultsSummary = props => (
  <div className="summaryContainer">
    <p><b>Summary: </b>
      <br />
      The overall polarity is: {props.polarity}.
    </p>
  </div>
);

export default ResultsSummary;
