import React from 'react'
import classnames from 'classnames'
// styles
import useStyles from './styles'

// components
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import PageTitle from '../PageTitle/PageTitle'
import Copyright from '../Copyright/Copyright'

// context
import { useLayoutState } from '../../context/LayoutContext'

function Layout({ page, history, navigation, title }) {
	const classes = useStyles()

	// global
	const layoutState = useLayoutState()
	const Page = page
	return (
		<div className={classes.root}>
			<>
				<Header history={history} />
				<Sidebar navigation={navigation} />
				<div
					className={classnames(classes.content, {
						[classes.contentShift]: layoutState.isSidebarOpened,
					})}
				>
					<div className={classes.fakeToolbar} />
					<PageTitle title={title} />
					<Page />
					<Copyright />
				</div>
			</>
		</div>
	)
}

export default Layout
