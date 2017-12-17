import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';
import Analyzer from './components/Analyzer.jsx';

// const customTheme = {};
// const muiTheme = getMuiTheme()
// <MuiThemeProvider muiTheme={muiTheme}>

ReactDOM.render(<Provider store={store}>
  <MuiThemeProvider>
    <Analyzer />
  </MuiThemeProvider>
</Provider>, document.getElementById('app'));
