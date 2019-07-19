/* eslint-disable no-script-url */

import React, { Component }  from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

function getData(url = '', token) {
  console.log('Get data receive token. '  + 'Bearer ' + token);
    return fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json());
  }

class Sites extends Component {
  constructor(props) 
  {
    super(props);
    this.state = {
        jsonData: null
    };
  }

  componentWillMount() 
  {
    this.loadData();
  }

  loadData() {
      getData('https://pbisite.azure-api.net/users', this.props.authToken)
      .then(data => this.setState({jsonData: data}))
      .catch(error => console.error(error));
  }

  render()
  {
    if (!this.state.jsonData) {
      return <div>Loading...</div>
    }

    console.log('jsonData: ' + JSON.stringify(this.state.jsonData));

    return (
      <React.Fragment>
        <Title>Reports</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Tenant GUID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.jsonData.map(row => (
              <TableRow key={row.UserKey}>
                <TableCell>{row.FirstName}</TableCell>
                <TableCell>{row.LastName}</TableCell>
                <TableCell>{row.Email}</TableCell>
                <TableCell>{row.Role}</TableCell>
                <TableCell>{row.TenantGUID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>

    );
  }

}

export default Sites;