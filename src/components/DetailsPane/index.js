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
import SiteModal from './SiteModal';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {Icon} from "@material-ui/core";

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


  toggleModal() {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
    // refresh on modal close
    if (!this.state.modalIsOpen) {
      this.API.getDetails(this.props.UserKey)
        .then((data) => {
            this.setState({jsonData: data});
          }
        );
    }
  }

  render() {
    if (!this.state.jsonData) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <IconButton onClick={() => this.toggleModal()}>
          <AddBox/>
        </IconButton>
        <MaterialTable
          columns={[
            {title: 'Site Name', field: 'Site'},
            {title: 'GUID', field: 'SiteID'},
            {title: 'ID', field: 'SiteKey'},
          ]}
          icons={tableIcons}
          data={this.state.jsonData}
          options={{
            search: false,
            padding: "dense",
            showTitle: false,
            toolbar: false,
            paging: false,
          }}
          editable={{
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                this.API.removeSiteUser(this.props.UserKey, oldData.SiteKey)
                  .then((success) => {
                    if (success) {
                      const data = this.state.jsonData;
                      const index = data.indexOf(oldData);
                      data.splice(index, 1);
                      this.setState({jsonData: data}, () => resolve())
                    }
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
        <SiteModal open={this.state.modalIsOpen} toggle={() => this.toggleModal()} UserKey={this.props.UserKey}
                   sites={this.state.sites} API={this.API}/>
      </div>
    )
  }
}

export default (DetailsPane)