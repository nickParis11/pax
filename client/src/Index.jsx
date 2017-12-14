import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';
import Analyzer from './components/Analyzer.jsx';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Analyzer />
    </MuiThemeProvider>
  </Provider>, document.getElementById('app'));
