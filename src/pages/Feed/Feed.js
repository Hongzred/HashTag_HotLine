import React from 'react'
import SimpleBreadcrumbs from '../../components/AppDescription/AppDescription'
import MainConsole from '../../components/MainConsole/MainConsole'

export default function Feed() {
	return (
		<>
			<MainConsole horizontal_controls="top">
				<SimpleBreadcrumbs />
				<SimpleBreadcrumbs />
				<SimpleBreadcrumbs />
			</MainConsole>
		</>
	)
}
