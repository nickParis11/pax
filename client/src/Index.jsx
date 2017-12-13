import React from 'react';
import ReactDOM from 'react-dom';
import Analyzer from './components/Analyzer.jsx';
import { Provider } from 'react-redux';
import store from './store.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(<Provider store={store}>
  <MuiThemeProvider>
    <Analyzer />
  </MuiThemeProvider>
</Provider>, document.getElementById('app'));