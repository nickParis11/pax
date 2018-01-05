import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const InputURL = props => (
  props.display &&
    <div>
      <h2>Enter a Url</h2><br />
      <p className="medium">... of any article you would like to analyze. Please keep in mind
         that articles with less than 450 words will likely not contain
         enough information to give a reliable result.</p>
      <br />
      <TextField
        floatingLabelText="Enter URL"
        id="input"
      />
      <br />
      <RaisedButton
        label="Analyze"
        className="marginSmall"
        onClick={props.checkInput.bind(null)}
      />
      <br />
      <span
        className="cursor-pointer"
        role="button"
        tabIndex="0"
        onClick={props.textToggleHandle.bind(null)}
        onKeyUp={props.handleKeyUp.bind(null)}
      >Switch to text
      </span>
    </div>
);

export default InputURL;
