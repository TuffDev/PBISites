import React, {Component} from 'react';
import API from './../../API';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from "@material-ui/core/Container";
import {withStyles} from "@material-ui/core";

const classes = theme => {
  return ({
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
    setting: {
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    errorPaper: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#FFBABA',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
    },
  })
};

const INITIAL_STATE = {
  tenant: '',
  clientID: '',
  clientSecret: '',
  error: null,
};

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.API = new API();

    this.state = {...INITIAL_STATE};
  }

  componentWillMount() {
    this.API.getApp()
      .then( data => {
        if (data.length > 0) {
          const {Tenant, ClientID, ClientSecret} = data[0];
          this.setState({tenant: Tenant, clientID: ClientID, clientSecret: ClientSecret});
        }
      })
  }

  onSubmit = event => {
    event.preventDefault();
    const {tenant, clientID, clientSecret} = this.state;
    this.API.createApp(tenant, clientID, clientSecret)
      .then( success => {
        if (!success) {
          this.setState({error: "Something went wrong creating the site"});
        }
      })
  };

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {
      tenant,
      clientID,
      clientSecret,
      error
    } = this.state;
    const {classes} = this.props;
    const isInvalid = tenant === '' || clientID === '' || clientSecret === '';
    return (
      <Container maxWidth="xl" className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant="h5">Configuration Page</Typography>
          <Typography variant="subtitle1" color="textSecondary"> Adjust your application settings here</Typography>
          <Divider/>
          <div className={classes.setting}>
            <Typography variant="h6">Setup</Typography>
            <form onSubmit={this.onSubmit} className={classes.form} noValidate>
              <TextField
                variant="outlined"
                id="standard-name"
                label="Tenant"
                name="tenant"
                fullWidth
                value={tenant}
                onChange={this.onChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant="outlined"
                fullWidth
                id="standard-name"
                label="ClientID"
                name="clientID"
                value={clientID}
                onChange={this.onChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant="outlined"
                fullWidth
                id="standard-name"
                label="ClientSecret"
                name="clientSecret"
                value={clientSecret}
                onChange={this.onChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Button
                disabled={isInvalid}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              > Save </Button>
            </form>
          </div>
          {error && <Paper className={classes.errorPaper}>{error.message}</Paper>}
        </Paper>
      </Container>
  )
  }
  }

  export default withStyles(classes)(Configuration);