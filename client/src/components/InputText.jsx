import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const InputText = props => (
  !props.display &&
    <div>
      <RaisedButton
        label="SWITCH TO URL"
        onClick={props.textToggleHandle.bind(null)}
      />
      <br />
      <textarea
        type="text"
        id="input"
        rows="20"
        cols="100"
      />
      <br />
      <RaisedButton
        label="Analyze"
        onClick={props.checkInput.bind(null)}
      />
    </div>
);

export default InputText;
