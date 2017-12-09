import React from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    analysis: store.analyzer.analysis,
  };
})

export default class Results extends React.Component {

  render() {
    let tone = this.props.analysis.document_tone;

    return (
    <div>
      <p>Emotional tones:
        <ul>
          {tone.tone_categories[0].tones.map( (emo) => {
            if (emo.score > .4)
              return <li>{emo.tone_name}</li>
          })}
        </ul>
      </p>

      <p>Language tones:
        <ul>
          {tone.tone_categories[1].tones.map( (lang) => {
            if (lang.score > .4)
              return <li>{lang.tone_name}</li>
          })}
        </ul>
      </p>

      <p>Social tones:
        <ul>
          {tone.tone_categories[2].tones.map( (soc) => {
            if (soc.score > .4)
              return <li>{soc.tone_name}</li>
          })}
        </ul>
      </p>
    </div>
    )
  }
}