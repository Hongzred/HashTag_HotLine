import React from 'react'

import Slider from '@material-ui/core/Slider'
// import VirtualizedList from '../TwitterFeed/TwitterFeed.js'
import Typography from '@material-ui/core/Typography'
import TwitterFeed from '../TwitterFeed/TwitterFeed'
import { UserStateContext } from '../../context/UserContext'

export default function MapControls() {
	const distanceMarks = [
		{ value: 5, label: '5mi' },
		{ value: 25, label: '20mi' },
		{ value: 50, label: '50mi' },
		{ value: 100, label: '100mi' },
	]

	const timeMarks = [
		{ value: 7, label: '1 week' },
		{ value: 182, label: '6 months' },
		{ value: 365, label: '1 year' },
	]

	function distanceValueLabelFormat(value) {
		return distanceMarks.findIndex(mark => mark.value === value) + 1
	}
	function timeValueLabelFormat(value) {
		return timeMarks.findIndex(mark => mark.value === value) + 1
	}
	function valuetext(value) {
		return `${value}`
	}

	return (
		<UserStateContext.Consumer>
		{context => <div>
			<Typography id="distance-slider" gutterBottom>
				Distance
			</Typography>
			<Slider
				defaultValue={5}
				valueLabelFormat={distanceValueLabelFormat}
				getAriaValueText={valuetext}
				aria-labelledby="distance-slider"
				step={null}
				valueLabelDisplay="auto"
				marks={distanceMarks}
				min={5}
			/>
			<Typography id="time-slider" gutterBottom>
				Time
			</Typography>
			<Slider
				defaultValue={7}
				// onChange={context.onDayRangeChanged}
				valueLabelFormat={timeValueLabelFormat}
				getAriaValueText={valuetext}
				aria-labelledby="time-slider"
				step={null}
				valueLabelDisplay="auto"
				marks={timeMarks}
				max={365}
			/>
			<TwitterFeed />
		</div>}
			
		</UserStateContext.Consumer>
	)
}
