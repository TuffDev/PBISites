import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Link} from 'react-router-dom'
import * as ROUTES from './constants/routes';
import {withRouter} from 'react-router-dom';

class MainListItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "Member",
    }
    props.user
      .then((users) => {
        this.setState({role: users[0].Role})
      });
  }

  onClick(path) {
    this.props.onClick();
    this.props.history.push(path);
  }

  render() {
    if (this.state.role === "Admin") {
      return (
        <List>
          <div>
            <ListItem button onClick={() => {
              this.onClick(ROUTES.DASHBOARD)
            }}>
              <ListItemIcon>
                <DashboardIcon/>
              </ListItemIcon>
            </ListItem>
            <ListItem button onClick={() => {
              this.onClick(ROUTES.CONFIGURATION)
            }}>
              <ListItemIcon>
                <SettingsIcon/>
              </ListItemIcon>
            </ListItem>
            <ListItem button onClick={() => {
              this.onClick(ROUTES.ACCOUNT)
            }}>
              <ListItemIcon>
                <PeopleIcon/>
              </ListItemIcon>
            </ListItem>
          </div>
        </List>)
    } else {
      return (
        <List>
          <div>
            <ListItem button onClick={() => {
              this.onClick(ROUTES.DASHBOARD)
            }}>
              <ListItemIcon>
                <DashboardIcon/>
              </ListItemIcon>
            </ListItem>
          </div>
        </List>)
    }
  }
}

export default withRouter(MainListItems);