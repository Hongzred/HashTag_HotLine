// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
// import PropTypes from 'prop-types';
// import Typography from '@material-ui/core/Typography';

// Generate Sales Data
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
console.log(data);

// // Title Heading for Chart
// function Title(props) {
//   return (
//     <Typography
//     	component="h2" 
//     	variant="h6" 
//     	color="primary" 
//     	gutterBottom>
    	
//       	{props.children}
//     </Typography>
//   );
// }

// Title.propTypes = {
//   children: PropTypes.node,
// };

// TODO: Implement Chart function