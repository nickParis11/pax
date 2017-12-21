import React from 'react';

const ResultsSummary = props => (
  <div className="width700">
    <p><b><i>{props.title}</i></b>
      <br />
      {props.summary}
    </p>
  </div>
);

export default ResultsSummary;
