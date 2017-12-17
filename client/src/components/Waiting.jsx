import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Waiting = () => {
  return (
    <div>
      <div className="container">
        <h1>ANALYZING...</h1>
      </div>
      <br />
      <div className="container">
        <CircularProgress />
      </div>
    </div>
  );
};

export default Waiting;
