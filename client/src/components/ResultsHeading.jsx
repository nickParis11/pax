import React from 'react';

const ResultsHeading = props => (
  <div className="column">
    <p>Trust Rating: <b>{props.score}%</b></p>
    <p>Overall polarity: <b>{props.polarity}</b></p>
  </div>
);

export default ResultsHeading;
