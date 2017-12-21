import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const InputText = props => (
  !props.display &&
    <div>
      <h2>Enter any text</h2><br />
      <p className="medium">... of any article you would like to analyze. Please keep in mind
         that submitting any text with less than 450 words will likely not contain
         enough information to give a reliable result.</p>
      <br />
      <textarea
        type="text"
        id="input"
        rows="10"
        cols="80"
        className="marginSmall"
        placeholder="Input text up to 1000 words..."
      />
      <br />
      <RaisedButton
        label="Analyze"
        onClick={props.checkInput.bind(null)}
      />
      <br />
      <p className="cursor-pointer" onClick={props.textToggleHandle.bind(null)}>Switch to URL</p>
    </div>
);

export default InputText;
