/* eslint-disable no-script-url */

import React, { Component }  from 'react';
import Title from './Title';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Auth from './Auth';

class SignUp extends Component {
  constructor(props)
  {
    super(props);
  }
  render()
  {
    let username = this.props.currentUser.firstName + " " + this.props.currentUser.lastName;
    return (

    <React.Fragment>
      <Title>Welcome, {username}!</Title>
      <Typography component="p" variant="h4">
        We need to gather some information from you to get your new account set up.
      </Typography>
    </React.Fragment>

    );
  }
}

//export default withStyles(useStyles)(SignUp);
//export default withRouter(SignUp);
export default SignUp;