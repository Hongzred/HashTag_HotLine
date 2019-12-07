import React from 'react'
import SimpleBreadcrumbs from '../../components/AppDescription/AppDescription'
import MainConsole from '../../components/MainConsole/MainConsole'
import Summary from '../../components/Summary/Summary'

export default function Feed() {
	return (
		<>
			<MainConsole horizontal_controls="top">
				<SimpleBreadcrumbs />
				<Summary />
				<SimpleBreadcrumbs />
			</MainConsole>
		</>
	)
}
