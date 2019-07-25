import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SignUp from "../../SignUp";
import Users from "../../Users";
import React from "react";
import authentication from 'react-azure-adb2c';
import {makeStyles} from "@material-ui/core";
import Sites from './../../components/Sites';
import Auth from './../../Auth';

const auth = new Auth();

const useStyles = makeStyles(theme => ({
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

}));

export default Home => (
  <Container maxWidth="xl" className={useStyles().container}>

    <Grid container spacing={3}>

      <Grid item xs={12}>

           <Sites />

      </Grid>


    </Grid>

  </Container>
);