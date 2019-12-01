import React from 'react'
import DayTweetChart from './DayTweetChart'
import WeekTweetChart from './WeekTweetChart'
import MonthTweetChart from './MonthTweetChart'
import YearTweetChart from './YearTweetChart'

// TweetChart component
export default function TweetChart(props) {
  const {chartType} = props
  if (chartType === 'Day') {
    return <DayTweetChart />
  }
  if (chartType === 'Week') {
    return <WeekTweetChart />
  }
  if (chartType === 'Month') {
    return <MonthTweetChart />
  }
  if (chartType === 'Year') {
    return <YearTweetChart />
  }
}
