import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Dashboard from './Dashboard'
import Home from './components/Home';
import Sites from './components/Sites';
import MemberSites from './components/MemberSites';
import Embed from './components/Embed';
import Account from './components/Account';
import Configuration from './components/Configuration';
import SignUp from './SignUp'
import * as ROUTES from './constants/routes';

export default function Routes(props) {
  const [role, setRole] = React.useState('Member');

  props.user
    .then((users) => {
      setRole(users[0].Role);
    });

      if (role === 'Admin') {
        return (
          <Switch>
            <Route exact path={ROUTES.DASHBOARD} component={Home}/>
            <Route exact path={ROUTES.EMBED} render={(props) => {
              return <Embed SiteKey={props.match.params.SiteKey}/>
            }}/>
            <Route exact path={ROUTES.SIGN_UP} component={SignUp}/>
            <Route exact path={ROUTES.ACCOUNT} component={Account}/>
            <Route exact path={ROUTES.CONFIGURATION} component={Configuration}/>
          </Switch>
        )
      } else {
        return (
          <Switch>
            <Route exact path={ROUTES.DASHBOARD} component={MemberSites}/>
            <Route exact path={ROUTES.EMBED} render={(props) => {
              return <Embed SiteKey={props.match.params.SiteKey}/>
            }}/>
          </Switch>
        )
      }
}