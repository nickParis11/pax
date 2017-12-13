import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Analyzer from './components/Analyzer.jsx';
import { Provider } from 'react-redux';
import store from './store.js';

ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
    <Analyzer />
  </BrowserRouter>
</Provider>, document.getElementById('app'));