import React, { useState, useEffect } from 'react'
import { Drawer, IconButton, List } from '@material-ui/core'
import {
	Home,
	Assignment as Report,
	ShowChart as Chart,
	Settings,
	ArrowBack as ArrowBackIcon,
} from '@material-ui/icons'
import { useTheme } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

// styles
import useStyles from './styles'

// components
import SidebarLink from '../SidebarLink/SidebarLink'

// context
import {
	useLayoutState,
	useLayoutDispatch,
	toggleSidebar,
} from '../../context/LayoutContext'

const orderedIcons = [Home, Chart, Report, Settings]
const createStructure = (nav, location, isSidebarOpened) => {
	return nav.map(({ label, link, id }, index) => (
		<SidebarLink
			key={id}
			location={location}
			isSidebarOpened={isSidebarOpened}
			icon={orderedIcons[index]}
			label={label}
			link={link}
		/>
	))
}

const Sidebar = ({ location, navigation }) => {
	const classes = useStyles()
	const theme = useTheme()

	// global
	const { isSidebarOpened } = useLayoutState()
	const layoutDispatch = useLayoutDispatch()

	// local
	const [isPermanent, setPermanent] = useState(true)

	const handleWindowWidthChange = () => {
		const windowWidth = window.innerWidth
		const breakpointWidth = theme.breakpoints.values.md
		const isSmallScreen = windowWidth < breakpointWidth

		if (isSmallScreen && isPermanent) {
			setPermanent(false)
		} else if (!isSmallScreen && !isPermanent) {
			setPermanent(true)
		}
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowWidthChange)
		handleWindowWidthChange()
		return function cleanup() {
			window.removeEventListener('resize', handleWindowWidthChange)
		}
	})

	return (
		<Drawer
			variant={isPermanent ? 'permanent' : 'temporary'}
			className={classNames(classes.drawer, {
				[classes.drawerOpen]: isSidebarOpened,
				[classes.drawerClose]: !isSidebarOpened,
			})}
			classes={{
				paper: classNames({
					[classes.drawerOpen]: isSidebarOpened,
					[classes.drawerClose]: !isSidebarOpened,
				}),
			}}
			open={isSidebarOpened}
		>
			<div className={classes.toolbar} />
			<div className={classes.mobileBackButton}>
				<IconButton onClick={() => toggleSidebar(layoutDispatch)}>
					<ArrowBackIcon
						classes={{
							root: classNames(
								classes.headerIcon,
								classes.headerIconCollapse,
							),
						}}
					/>
				</IconButton>
			</div>
			<List className={classes.sidebarList}>
				{createStructure(navigation, location, isSidebarOpened)}
			</List>
		</Drawer>
	)
}

export default withRouter(Sidebar)
