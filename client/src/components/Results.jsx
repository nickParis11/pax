import React from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    sentiment: store.analyzer.sentiment,
    tone: store.analyzer.tone,
  };
}) export default class Results extends React.Component {
  render() {
    const tone = this.props.tone.document_tone;
    const sentiment = this.props.sentiment;

    return (
      <div>
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
      </div>
    );
  }
}
