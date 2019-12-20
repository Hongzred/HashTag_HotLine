import React from 'react'
import AppDescription from '../../components/AppDescription/AppDescription'
import MainConsole from '../../components/MainConsole/MainConsole'
import Summary from '../../components/Summary/Summary'
import GettingStarted from '../../components/GettingStarted/GettingStarted'

export default function Feed() {
	return (
		<>
			<MainConsole horizontal_controls="top">
				<GettingStarted />
				<Summary />
				<AppDescription />
			</MainConsole>
		</>
	)
}
