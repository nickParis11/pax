import React from 'react';
import ReactDOM from 'react-dom';
import Results from './components/Results.jsx';

const Index = () => {
  return (
    <div>
      <h1>Hello world!</h1>
      <Results />
    </div>
  )
}

ReactDOM.render(<Index />, document.getElementById('app'));