import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import './App.css';
import Routes from './routes'
import Dashboard from './Dashboard';
import { blue, indigo } from '@material-ui/core/colors'
import {BrowserRouter} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;