import DayTweetChart from './DayTweetChart' 
import WeekTweetChart from './WeekTweetChart';
import MonthTweetChart from './MonthTweetChart'
import YearTweetChart from './YearTweetChart'
import React from 'react';


// TweetChart component
export default function TweetChart(props) {

	const chartType = props.chartType;
	if(chartType === 'Day'){
		return(<DayTweetChart/>);
	}
	else if(chartType === 'Week'){
		return(<WeekTweetChart/>);
	}
	else if(chartType === 'Month'){
		return(<MonthTweetChart/>);
	}
	else if(chartType === 'Year'){
		return(<YearTweetChart/>);
	}
  }
