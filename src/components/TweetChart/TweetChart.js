import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

// Generate Sales Data 
// TODO: DELETE createData() and get new data with graphql
function createData() {
	let data = [];
	let hour = '';
	let tweets = 0;
	for (let i = 0; i < 24; i+=3) {
		tweets = Math.floor(Math.random() * 30)
		if (i<10){
			hour = '0' + i.toString() + ':00'
		}
		else {
			hour = i.toString() + ':00'
		}
		
		data.push(
			[hour, tweets]
		)
	}
	data.push(['24:00', undefined]);
	return data;
}
const data = createData(); 

// Title Heading for Chart
function Title(props) {
  return (
    <Typography
    	component="h2" 
    	variant="h6" 
    	color="primary" 
    	gutterBottom>
    	
      	{props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

// TweetChart component
export default function TweetChart() {
	return (
	  <React.Fragment> 
		{/*need React.Fragments because two components are returned here: 
		the title and responsive container that contains TweetChart*/}
		<Title>Tweets over Time</Title>
		<ResponsiveContainer>
		  <LineChart
			data={data}
			margin={{
			  top: 16,
			  right: 16,
			  bottom: 0,
			  left: 24,
			}}
		  >
			<XAxis dataKey="time" />
			<YAxis>
			  <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
				Sales ($)
			  </Label>
			</YAxis>
			<Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false} />
		  </LineChart>
		</ResponsiveContainer>
	  </React.Fragment>
	);
  }