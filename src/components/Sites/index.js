/* eslint-disable no-script-url */

import React, {Component} from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MaterialTable from "material-table";
import API from './../../API';
import SiteDetailPane from './../SiteDetailPane';
import MTableToolbar from 'material-table';
import {forwardRef} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';

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
import CloudUpload from '@material-ui/icons/CloudUpload';
import Modal from '@material-ui/core/Modal';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

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
  CloudUpload: forwardRef((props, ref) => <CloudUpload {...props} ref={ref}/>),
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

class Sites extends Component {
  constructor(props) {
    super(props);
    this.API = new API();

    this.state = {
      jsonData: null,
      modalIsOpen: false,
      file: null,
    };

    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  componentWillMount() {
    this.API.getSites()
      .then((data) => {
          this.setState({jsonData: data});
        }
      )
  }

  handleFileSelect(event) {
    this.setState({file: event.target.files[0]})
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  handleRowClick(rowData) {
    this.props.history.push('/site/' + rowData.SiteKey);
  }

  handleUpload = event => {
    event.preventDefault();
    const data = this.state.jsonData;
    data.push({Site: this.state.file.name, SiteID: "test site", SiteKey: 5});
    this.setState({modalIsOpen: false, file: null});
  };

  render() {
    if (!this.state.jsonData) {
      return <div>Loading...</div>
    }
    const {classes} = this.props;
    const invalid = !!!this.state.file;

    return (
      <div>
        <MaterialTable
          columns={[
            {title: 'Site Name', field: 'Site'},
            {title: 'Site ID', field: 'SiteID'},
          ]}
          data={this.state.jsonData}  //todo make this a Promise
          icons={tableIcons}
          title="Manage Sites"
          // detailPanel={[
          //         //   {
          //         //     tooltip: "Show Sites",
          //         //     render: rowData => <SiteDetailPane SiteKey={rowData.SiteKey}/>
          //         //   }
          //         // ]}
          // onRowClick={(event, rowData, togglePanel) => togglePanel()}
          editable={{
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                this.API.removeSite(oldData.SiteKey)
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
          actions={[
            {
              icon: () => <CloudUpload/>,
              tooltip: 'Upload New Site',
              isFreeAction: true,
              onClick: () => this.openModal(),
            }
          ]}
          onRowClick={(event, rowData, togglePanel) => this.handleRowClick(rowData)}
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
            <form className={classes.container} onSubmit={this.handleUpload}>
              <input type="file" id="fileinput" accept=".pbix" onChange={this.handleFileSelect}/>
              <Button
                disabled={invalid}
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

export default withRouter(withStyles(classes)(Sites));