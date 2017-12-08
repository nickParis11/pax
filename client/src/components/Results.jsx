import React from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    data: store.data,
  };
})

export default class Results extends React.Component {
  componentWillMount() {
    this.props.dispatch({  type: 'FETCH_DATA_START'  });
  }

  clickHandle() {
    return function(dispatch) {
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          dispatch({ type: 'RECEIVE_DATA', payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: 'FETCH_DATA_ERROR', payload: err });
        });
    }
  }

  render() {
    console.log(this.props.data);
    if (!this.props.data) {
      return (
        <div>
          <h1>Hello world!</h1>
          <button onClick={this.clickHandle.bind(this)}>Show data</button>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Hello world!</h1>
          { this.props.data.map((item) => <p>{item.name}</p>) }
        </div>
      )
    }
  }
}