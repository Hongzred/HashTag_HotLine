import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));


export default function ChipsArray() {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 0, active: true, label: '#gasleak' },
    { key: 1, active: true, label: '@coned' },
    { key: 2, active: true, label: '#help' }
  ]);

  return (
    <div className={classes.root}>
      {chipData.map(data => {

        return (
          <Chip
            key={data.key}
            label={data.label}
            onDelete={handleDelete(data)}
            className={classes.chip}
            color="primary"
            disabled={data.active}
          />
        );

      })}
    </div>
  );
}