/* eslint-disable no-script-url */

import React, {Component} from 'react';
import MaterialTable from "material-table";
import API from './API';
import DetailsPane from './components/DetailsPane';

import {forwardRef} from 'react';
import {withStyles} from "@material-ui/core/styles";

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
import PersonAdd from '@material-ui/icons/PersonAdd';
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import {CircularProgress} from "@material-ui/core";

const classes = theme => ({
  root: {
    display: 'flex',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    position: 'absolute',
    width: '100',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 4),
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#6c757f',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  loading: {
    top: '50%',
    left: '50%',
    position: 'absolute',
  },
});

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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>),
  PersonAdd: forwardRef((props, ref) => <PersonAdd {...props} ref={ref}/>)
};

class Users extends Component {
  constructor(props) {
    super(props);
    this.API = new API();
    this.state = {
      jsonData: null,
      modalIsOpen: false,
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      role: 'member',
      error: null,
    };
  }


  componentWillMount() {
    this.API.getUsers()
      .then((data) => {
          this.setState({jsonData: data});
        }
      )
  }

  toggleModal() {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
    this.setState({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      role: 'member',
      error: null,
    })
  }

  createUser = event => {
    event.preventDefault();
    const {email, password, firstname, lastname, role} = this.state;
    const data = {
      role: role,
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      Password: password
    };
    this.API.addUser(data);
    this.toggleModal();
    // refresh user listing after user add
    this.API.getUsers()
      .then((data) => {
          this.setState({jsonData: data});
        }
      )
  };

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {classes} = this.props;
    const {email, password, firstname, lastname, role} = this.state;
    const submitDisabled = !!!email || !!!password || !!!firstname || !!!lastname || !!!role;
    if (!this.state.jsonData) {
      return <CircularProgress className={classes.loading}/>
    }

    return (
      <div>
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
          actions={[
            {
              icon: () => <PersonAdd/>,
              tooltip: 'Add New User',
              isFreeAction: true,
              onClick: () => this.toggleModal(),
            }
          ]}
          localization={{
            body: {
              editRow: {
                deleteText: 'Are you sure?'
              }
            }
          }}

        />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalIsOpen}
          onClose={() => this.toggleModal()}
        >
          <Paper className={classes.paper}>
            <Typography variant="h6">Input user information</Typography>
            <Divider/>
            <form className={classes.container} onSubmit={this.createUser}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="First Name"
                name="firstname"
                value={firstname}
                onChange={this.onChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Last Name"
                name="lastname"
                value={lastname}
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                value={email}
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                onChange={this.onChange}
                label="Password"
                type="password"
              />
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel ref={null} htmlFor="outlined-role-simple">
                  Role
                </InputLabel>
                <Select
                  value={role}
                  onChange={this.onChange}
                  fullWidth
                  required
                  input={<OutlinedInput labelWidth={38} name="role" id="outlined-role-simple"/>}
                >
                  <MenuItem value={"member"}>Member</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
              <Button
                disabled={submitDisabled}
                type="submit"
                variant="contained"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Modal>

      </div>
    );
  }
}

export default withStyles(classes)(Users);