import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Waiting = () => {
  return (
    <div>
      <h3>Analyzing...</h3>
      <CircularProgress />
    </div>
  );
};

export default Waiting;
