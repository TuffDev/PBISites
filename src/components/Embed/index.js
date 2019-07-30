import React, {Component} from 'react';
import API from './../../API';
import Report from 'powerbi-report-component';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from './Toolbar';
import {compose} from 'recompose';

import * as pbi from 'powerbi-client';

import {withStyles} from "@material-ui/core";
import {withWidth} from "@material-ui/core";


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

    let mobileView = props.width === "sm" || props.width === "xs";
    this.state = {
      embedConfig: {
        id: null,
        embedUrl: "https://app.powerbi.com/reportEmbed",
        accessToken: null,
      },
      pages: [''],
      currentPage: 0,
      error: false,
      mobileView: mobileView,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.width !== prevProps.width) {
      let mobileView = this.props.width === "sm" || this.props.width === "xs"
      this.setState({mobileView: mobileView});
    }
  }

  componentWillMount() {
    this.API.getEmbedToken(parseInt(this.props.SiteKey))
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


  handleReportRender = (report) => {
    this.report = report; // get the object from callback and store it.

    report.getPages()
      .then((pages) => {
        if (this.state.pages[0] === '') { // todo decouple from State.  currently re-renders on report load
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
    let currentPage = 0;
    const layoutType = this.state.mobileView ? pbi.models.LayoutType.MobilePortrait : pbi.models.LayoutType.Master;
    return (
      <div>
        <AppBar position="static">
          <Tabs
            value={0}
            onChange={(event, pageNum) => this.report.setPage(this.state.pages[pageNum].name)}
            aria-label="simple-tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            {this.state.pages.map((page) => {
              return (<Tab label={page.displayName}/>);
            })}
          </Tabs>
        </AppBar>
        <Report
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
          extraSettings={{
            filterPaneEnabled: false,
            navContentPaneEnabled:
              false,
            background:
            pbi.models.BackgroundType.Transparent,
            layoutType: layoutType,
          }}
        />
      </div>
    )
  }
}

export default compose(withWidth(), withStyles(classes))(Embed)
