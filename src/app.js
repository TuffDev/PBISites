import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import './App.css';
import Routes from './routes'
import Dashboard from './Dashboard';
import { blue, indigo } from '@material-ui/core/colors'
import { MuiThemeProvider } from "@material-ui/core/styles";
import {BrowserRouter} from "react-router-dom";

const flexwareTheme = createMuiTheme({
  // todo: make a wrapper component so you don't clutter up App
  palette: {
    primary: {
      main: '#5e5e5e'
    },
    secondary: {
      main: '#5e5e5e',
      contrastText: '#282c34',
    },
  },
});

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <MuiThemeProvider theme={flexwareTheme}>
          <Dashboard />
          </MuiThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;