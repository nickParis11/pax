import React from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    score: store.analyzer.score,
    sentiment: store.analyzer.sentiment,
    tone: store.analyzer.tone,
  };
})

export default class Results extends React.Component {
  render() {
    const tone = this.props.tone.document_tone;
    console.log(this.props);
    const sentiment = this.props.sentiment;

    return (
      <div>
        <h1 className="componentTitle">RESULTS</h1>
        <h2 className="trustRating">Trust Rating: {this.props.score}</h2>
        <div className="container">
          <div className="item">
            <p><b>Summary:</b></p>
            <p>Waistcoat pork belly cliche, typewriter literally scenester live-edge vice lumbersexual farm-to-table humblebrag coloring book etsy master cleanse adaptogen.</p>
          </div>
          <div className="item">
            <span className="arrow">↑</span>
            <span className="arrow">↓</span>
          </div>
        </div>
      </div>
    );
  }
}

/*
  <p>Our score: </p>
  <p>Polarity: {sentiment.polarity}</p>
  <p>Emotional tones:
  <ul>
  {tone.tone_categories[0].tones.map((emo) => {
  return (
  <li>{emo.tone_name}, {Math.round(emo.score * 100)}%</li>
  );
  })}
  </ul>
  </p>

  <p>Language tones:
  <ul>
  {tone.tone_categories[1].tones.map((lang) => {
  return (
  <li>{lang.tone_name}, {Math.round(lang.score * 100)}%</li>
  );
  })}
  </ul>
  </p>

  <p>Social tones:
  <ul>
  {tone.tone_categories[2].tones.map((soc) => {
  return (
  <li>{soc.tone_name}, {Math.round(soc.score * 100)}%</li>
  );
  })}
  </ul>
  </p>
  


*/
