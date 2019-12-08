import React from 'react'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'

function handleClick(event) {
	event.preventDefault()
	// console.log('You clicked a breadcrumb.');
}

export default function SimpleBreadcrumbs() {
	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Typography
				color="inherit"
				href="/gettingStarted"
				onClick={handleClick}
			>
				Getting Started
			</Typography>
			<Typography color="inherit" href="/summary/" onClick={handleClick}>
				Summary
			</Typography>
			<Link color="textPrimary" href="mailto:hashTagHotLine@gmail.com">
				Contact Us
			</Link>
		</Breadcrumbs>
	)
}
