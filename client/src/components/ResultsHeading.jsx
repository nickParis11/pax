import React from 'react';

const ResultsHeading = props => (
  <div>
    <h1 className="componentTitle">RESULTS</h1>
    <h2 className="trustRating">Trust Rating: {props.score}%</h2>
  </div>
);

export default ResultsHeading;
