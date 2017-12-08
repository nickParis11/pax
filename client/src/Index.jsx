import React from 'react';
import ReactDOM from 'react-dom';
import Analyzer from './components/Analyzer.jsx';
import { Provider } from 'react-redux';
import store from './store.js';

ReactDOM.render(<Provider store={store}>
  <Analyzer />
</Provider>, document.getElementById('app'));