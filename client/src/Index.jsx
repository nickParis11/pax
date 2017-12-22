import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';
import Analyzer from './components/Analyzer.jsx';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#00bfa5', // <--- teal
    primary2Color: '#455a64', // <--- dark grey
    accent1Color: '#f50057', // <--- red
    primary3Color: '#78909c', // <--- med grey
    accent2Color: '#cfd8dc', // <--- light grey
    accent3Color: '#607d8b',
    secondaryTextColor: '#607d8b',
    borderColor: '#90a4ae',
    disabledColor: '#607d8b',
    pickerHeaderColor: '#455a64',
    clockCircleColor: 'rgba(0, 0, 0, 0.26)',
  },
  appBar: {
    color: '#455a64',
  },
  raisedButton: {
    primaryTextColor: '#ffffff',
    color: '#455a64',
    textColor: '#ffffff',
  },
  flatButton: {
    color: '#455a64',
    textColor: 'rgba(255, 255, 255, 0.87)',
    disabledTextColor: 'rgba(255, 255, 255, 0.54)',
  },
  tabs: {
    backgroundColor: '#455a64',
  },
});

render(<Provider store={store}>
  <MuiThemeProvider muiTheme={muiTheme}>
    <Analyzer />
  </MuiThemeProvider>
</Provider>, document.getElementById('app'));
