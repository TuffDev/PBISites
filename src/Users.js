/* eslint-disable no-script-url */

import React, {Component} from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import MaterialTable from "material-table";
import API from './API';
import DetailsPane from './components/DetailsPane';

import {forwardRef} from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref}/>),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

class Users extends Component {
  constructor(props) {
    super(props);
    this.API = new API();
    this.state = {
      jsonData: null
    };
  }

  componentWillMount() {
    this.API.getUsers()
      .then((data) => {
          this.setState({jsonData: data});
        }
      )
  }

  render() {
    if (!this.state.jsonData) {
      return <div>Loading...</div>
    }

    return (
      <MaterialTable
        columns={[
          {title: 'First Name', field: 'FirstName'},
          {title: 'Surname', field: 'LastName'},
          {title: 'Role', field: 'Role'},
          {title: 'Email', field: 'Email'},
          {title: "UserID", field: "UserKey"},  // todo remove, dev purposes only
        ]}
        data={this.state.jsonData}  //todo make this a Promise
        icons={tableIcons}
        title="Manage Users"
        options={{
          pageSize: 10,
        }}
        detailPanel={[
          {
            tooltip: "Show Sites",
            render: rowData => <DetailsPane UserKey={rowData.UserKey}/>
          }
        ]}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
        editable={{
          onRowAdd: newData =>  // todo ensure clientID/Tenant are set so this succeeds. return error if not
            new Promise((resolve, reject) => {
              this.API.addUser(newData)
                .then(success => {
                  if (success) {
                    let data = this.state.jsonData;
                    data.push(newData);
                    this.setState({jsonData: data}, () => resolve());
                  } else reject();
                })
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              this.API.removeUser(oldData.UserKey)
                .then(success => {
                  if (success) {
                    let data = this.state.jsonData;
                    const index = data.indexOf(oldData);
                    data.splice(index, 1);
                    this.setState({jsonData: data}, () => resolve());
                  } else reject();
                })
            })
        }}
        localization={{
          body: {
            editRow: {
              deleteText: 'Are you sure?'
            }
          }
        }}

      />
    );
  }

}

export default Users;