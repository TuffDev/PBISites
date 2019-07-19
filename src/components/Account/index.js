import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import authentication from 'react-azure-adb2c'
import Grid from "@material-ui/core/Grid";
import SignUp from "../../SignUp";
import Users from "../../Users";
import Auth from './../../Auth';

const classes = theme => ({
  root: {
    display: 'flex',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

});

class Account extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {classes} = this.props;
    const auth = new Auth();
    return (
      <Container maxWidth="xl" className={classes.container}>

        <Grid container spacing={3}>

          <Grid item xs={12}>

              <Users authToken={auth.getToken()}/>

          </Grid>

        </Grid>

      </Container>
    )
  }
}

export default withStyles(classes)(Account);