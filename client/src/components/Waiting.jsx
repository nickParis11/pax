import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Waiting = props => (
  props.display &&
    <div className="padTop center-text">
      <h2>Analyzing...</h2>
      <br />
      <CircularProgress size={100} thickness={7} className="marginSmall" />
      <br />
      <p className="medium center-text">
        We are currently gathering tonal and sentiment analysis
        in order to calculate a trust rating for your article.
      </p>
    </div>
);

export default Waiting;
