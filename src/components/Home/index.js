import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SignUp from "../../SignUp";
import Users from "../../Users";
import React from "react";
import {makeStyles} from "@material-ui/core";
import Sites from './../../components/Sites';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

}));

export default Home => (
  <Container maxWidth="xl" className={useStyles().container}>
    <Sites/>
  </Container>
);