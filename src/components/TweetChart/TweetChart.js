import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

function Title(props) {
  return (
    <Typography>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

// TODO: Implement Chart function