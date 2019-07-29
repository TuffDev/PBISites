import React, {useState} from 'react';

import { makeStyles } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';

import API from './../../API';


const useStyles = makeStyles( theme => ({
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
    bottom: 0,
  },
}));

function SiteModal(props) {
  const [selected, setSelected] = useState('');
  const classes = useStyles();
  const disabled = !!!selected;
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.toggle}
    >
      <Paper className={classes.paper}>
        <Typography variant="h6">Select site to grant access</Typography>
        <Divider/>
        <form className={classes.container} onSubmit={(event) => {
          event.preventDefault();
          addUserSite(props.API, props.UserKey, selected)
            .then(props.toggle)}}>
          <Select
            value={selected}
            label="Site Name"
            onChange={(event) => setSelected(event.target.value)}
            inputProps={{
              name: 'sites',
              id: 'sites-simple',
            }}
          >
            {props.sites.map((site) => {
              return(<MenuItem value={site.SiteKey}>{site.Site}</MenuItem>)
            })}
          </Select>
          <Button
            disabled={disabled}
            type="submit"
            variant="contained"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Modal>
  )
}

function addUserSite(API, UserKey, SiteKey) {
  return( API.addSiteUser(UserKey, SiteKey) )
}

export default SiteModal;
