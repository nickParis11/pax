import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const InputURL = props => (
  props.display &&
    <div>
      <RaisedButton
        label="SWITCH TO TEXT"
        onClick={props.textToggleHandle.bind(null)}
      />
      <br />
      <TextField
        floatingLabelText="Enter URL"
        id="input"
      />
      <br />
      <RaisedButton
        label="Analyze"
        onClick={props.checkInput.bind(null)}
      />
    </div>
);

export default InputURL;
