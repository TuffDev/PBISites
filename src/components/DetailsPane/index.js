import MaterialTable from "material-table";
import Container from '@material-ui/core/Container';
import React, {Component} from "react";
import API from './../../API';

import {forwardRef} from 'react';
import {withStyles} from '@material-ui/core/styles';

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
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

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

});

class DetailsPane extends Component {
  constructor(props) {
    super(props);
    this.API = new API();
    this.state = {
      jsonData: null,
      sites: [],
      modalIsOpen: false,
    };
  }

  componentWillMount() {
    this.API.getDetails(this.props.UserKey)
      .then((data) => {
          this.setState({jsonData: data});
        }
      );
    this.API.getSites()
      .then((data) => this.setState({sites: data}));
  }

  addUserSite(event){
    event.preventDefault();
    this.API.addSiteUser(this.props.UserKey, )
  }

  render() {
    if (!this.state.jsonData) {
      return <div>Loading...</div>
    }
    return (
      <Container>
        <IconButton aria-label="add" onClick={this.setState({modalIsOpen: true})}>
          <AddBox/>
        </IconButton>
        <MaterialTable
          columns={[
            {title: 'Site Name', field: 'Site'},
            {title: 'GUID', field: 'SiteID'},
            {title: 'ID', field: 'SiteKey'},
          ]}
          data={this.state.jsonData}
          options={{
            search: false,
            padding: "dense",
            showTitle: false,
            toolbar: false,
            paging: false,
          }}
        />

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalIsOpen}
          onClose={() => this.setState({modalIsOpen: false})}
        >
          <Paper className={classes.paper}>
            <Typography variant="h6">Upload your site file</Typography>
            <Divider/>
            <form className={classes.container} onSubmit={this.addUserSite}>
              <Select

              >
              </Select>
              <Button
                disabled={false}
                type="submit"
                variant="contained"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Modal>
      </Container>
    )
  }

}

export default withStyles(classes)(DetailsPane)