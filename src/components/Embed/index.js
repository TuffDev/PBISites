import React, {Component} from 'react';
import API from './../../API';
import Report from 'powerbi-report-component';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import * as pbi from 'powerbi-client';

import {withStyles} from "@material-ui/core";


const classes = theme => {
  return ({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    progress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
    }
  })
};

class Embed extends Component {
  constructor(props) {
    super(props);

    this.API = new API();
    this.report = null;

    this.state = {
      embedConfig: {
        id: null,
        embedUrl: "https://app.powerbi.com/reportEmbed",
        accessToken: null
      },
      pages: [],
      error: false,
    }
  }

  componentWillMount() {
    this.API.getEmbedToken(this.props.SiteKey)
      .then(data => {
          if (data) {
            this.setState({
              embedConfig: {
                accessToken: data.token,
                id: data.reportid,
                embedUrl: "https://app.powerbi.com/reportEmbed",
              }
            });
          } else {
            this.setState({error: true});
          }
        }
      )
  }

  handleTabClick = (event, pageNum) => {
    this.report.setPage(this.state.pages[pageNum].name);
  };

  handleReportLoad = (report) => {
    console.log(report);
  };

  handleReportRender = (report) => {
    this.report = report; // get the object from callback and store it.

    report.getPages()
      .then((pages) => {
        if (this.state.pages.length === 0) { // todo decouple from State.  currently re-renders on report load
          this.setState({pages: pages.filter((page) => page.visibility === 0)});  // only show visible tabs
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const {classes} = this.props;

    const isReady = !!this.report;

    return (
      <div>
        <AppBar position="static">
          <Tabs value={0} onChange={this.handleTabClick} aria-label="simple tabs example">
            {this.state.pages.map( (page) => {
              return (<Tab label={page.displayName}/>);
            })}
          </Tabs>
        </AppBar>
        < Report
          embedId={this.state.embedConfig.id}
          embedUrl={this.state.embedConfig.embedUrl}
          accessToken={this.state.embedConfig.accessToken}
          tokenType="Embed"
          embedType="report"
          permissions="All"
          style={{
              height: 800
          }}
          onRender={this.handleReportRender}
          onLoad={this.handleReportLoad}
          extraSettings={{
              filterPaneEnabled: false,
              navContentPaneEnabled:
                false,
              background:
              pbi.models.BackgroundType.Transparent,

          }}
        />
      </div>
    )
  }
}

export default withStyles(classes)(Embed)
