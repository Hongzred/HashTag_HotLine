import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import TimelineIcon from '@material-ui/icons/Timeline'
import AssignmentIcon from '@material-ui/icons/Assignment'
import SettingsIcon from '@material-ui/icons/Settings'
import { Link } from 'react-router-dom'

export const mainListItems = (
	<div>
		<ListItem button component={Link} to="/map">
			<ListItemIcon>
				<HomeIcon />
			</ListItemIcon>
			<ListItemText primary="Overview" />
		</ListItem>
		<ListItem button component={Link} to="/chart">
			<ListItemIcon>
				<TimelineIcon />
			</ListItemIcon>
			<ListItemText primary="Analytics" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Reports" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<SettingsIcon />
			</ListItemIcon>
			<ListItemText primary="Settings" />
		</ListItem>
	</div>
)

export const secondaryListItems = <div />
