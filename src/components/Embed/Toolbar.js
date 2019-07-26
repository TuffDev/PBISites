import React, {useState} from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from "@material-ui/core/AppBar";


// function components are the best
function Toolbar(props) {
  const [page, setPage] = useState(0);
  return (
    <AppBar position="static">
      <Tabs
        value={page}
        onChange={(event, pageNum) => this.props.onClick(pageNum)}
        aria-label="simple-tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        {this.pages.map((page) => {
          return (<Tab label={page.displayName}/>);
        })}
      </Tabs>
    </AppBar>
  )
}

function onReportRender(report) {
  this.report = report;
  this.pages = report.getPages();
}


export default Toolbar;