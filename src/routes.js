import React from 'react'
import { Route, Switch} from 'react-router-dom'
import Dashboard from './Dashboard'
import Home from './components/Home';
import Embed from './components/Embed';
import Account from './components/Account';
import Configuration from './components/Configuration';
import SignUp from './SignUp'
import * as ROUTES from './constants/routes';

export default props => (
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