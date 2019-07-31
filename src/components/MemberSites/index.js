import React, {Component} from 'react';
import MaterialTable from "material-table";
import API from './../../API';
import {forwardRef} from 'react';
import {withRouter} from 'react-router-dom';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import CircularProgress from '@material-ui/core/CircularProgress'
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
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {withStyles} from "@material-ui/core";

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
  loading: {
    top: '50%',
    left: '50%',
    position: 'absolute',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
});

class MemberSites extends Component {
  constructor(props) {
    super(props);
    this.API = new API();

    this.state = {
      jsonData: null,
    };
  }

  componentWillMount() {
    this.API.getSites()
      .then((data) => {
          this.setState({jsonData: data});
        }
      )
  }

  handleRowClick(rowData) {
    this.props.history.push('/site/' + rowData.SiteKey);
  }

  // todo cancel requests in componentWillUnmount as per console

  render() {
    if (!this.state.jsonData) {
      return <CircularProgress className={classes.loading}/>
    }

    return (
      <Container maxWidth="xl" className={classes.container}>
            <MaterialTable
              columns={[
                {title: 'Site Name', field: 'Site'},
                {title: 'Site ID', field: 'SiteID'},
              ]}
              data={this.state.jsonData}  //todo make this a Promise
              icons={tableIcons}
              title="View Sites"
              options={{
                pageSize: 10,
              }}
              localization={{
                body: {
                  editRow: {
                    deleteText: 'Are you sure?'
                  }
                }
              }}
              onRowClick={(event, rowData, togglePanel) => this.handleRowClick(rowData)}
            />
      </Container>
    );
  }
}

export default withRouter(withStyles(classes)(MemberSites));