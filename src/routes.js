import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import Home from './components/Home';
import Account from './components/Account';
import SignUp from './SignUp'
import * as ROUTES from './constants/routes';

export default props => (
        <Switch>
          <Route exact path={ROUTES.DASHBOARD} component={Home} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
          <Route exact path={ROUTES.ACCOUNT} component={Account} />
        </Switch>
  )