import React from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    login: store.user.login,
    signup: store.user.signup,
  }
})

export default class Nav extends React.Component {
  render() {
    return(
      <div>
        <h1>Pax Atlantica</h1>
        {this.props.login ? <p>Log out</p> : <p>Sign in</p>}
      </div>
    )
  }
}