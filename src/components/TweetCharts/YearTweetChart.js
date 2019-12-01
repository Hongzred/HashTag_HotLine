import React, {PureComponent} from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

// Title Heading for Chart
function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  )
}

Title.propTypes = {
  children: PropTypes.node,
}

// Custom Label that appears on points
class PointLabel extends PureComponent {
  render() {
    const {x, y, stroke, value} = this.props
    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontsize={12} textAnchor="middle">
        {value}
      </text>
    )
  }
}
// YearTweetChart component
export default function YearTweetChart() {
  // Generate Tweet Data
  const data = []
  let hour = ''
  let tweets = 0
  for (let i = 0; i < 24; i += 3) {
    tweets = Math.floor(Math.random() * 4)
    if (i < 10) {
      hour = `0${i.toString()}:00`
    } else {
      hour = `${i.toString()}:00`
    }

    data.push({time: hour, tweets})
  }
  data.push(['24:00', undefined])

  return (
    <>
      {/* need React.Fragments because two components are returned here: 
		the title and responsive container that contains YearTweetChart */}
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
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="time" />
          <YAxis allowDecimals={false}>
            <Label angle={270} position="left" style={{textAnchor: 'top'}}>
              Tweets
            </Label>
          </YAxis>
          <Tooltip />
          <Line
            type="monotone"
            dataKey="tweets"
            stroke="#556CD6"
            strokeWidth={3}
            label={<PointLabel />}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
