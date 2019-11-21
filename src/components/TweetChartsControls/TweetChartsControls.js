import React from 'react';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

export default function TweetChartsControls(props) {

    const classes = props.classes;

    return(    
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <MenuList>
              <MenuItem>Day</MenuItem>
              <MenuItem>Week</MenuItem>
              <MenuItem>Month</MenuItem>
              <MenuItem>Year</MenuItem>
            </MenuList>
          </Paper>
        </div>
        )
}
