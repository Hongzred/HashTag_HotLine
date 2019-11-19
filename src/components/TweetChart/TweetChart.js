import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

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

	// Generate Tweet Data 
	let data = [];
	let hour = '';
	let tweets = 0;
	for (let i = 0; i < 24; i+=3) {
		tweets = Math.floor(Math.random() * 4)
		if (i<10){
			hour = '0' + i.toString() + ':00'
		}
		else {
			hour = i.toString() + ':00'
		}
		
		data.push(
			{'time': hour, 'tweets': tweets}
		)
	}
	data.push(['24:00', undefined]);


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
		    <CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="time" />
			<YAxis>
			  <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
				Tweets
			  </Label>
			</YAxis>
			<Tooltip />
			<Line type="monotone" dataKey="tweets" stroke="#556CD6"  />
		  </LineChart>
		</ResponsiveContainer>
	  </React.Fragment>
	);
  }
