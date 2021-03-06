import React, { useState } from 'react'
import MainConsole from '../../components/MainConsole/MainConsole'
import TweetChart from '../../components/TweetCharts/TweetChart'
import TweetChartsControls from '../../components/TweetChartsControls/TweetChartsControls'

export default function Analytics() {
	const [chartType, setChartType] = useState('Day')

	return (
		<>
			<MainConsole horizontal_controls="bottom">
				<TweetChart chartType={chartType} />
				<TweetChartsControls click={setChartType} />
			</MainConsole>
		</>
	)
}
