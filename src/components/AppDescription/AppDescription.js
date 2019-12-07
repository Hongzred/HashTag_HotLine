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
			<Link color="inherit" href="/" onClick={handleClick}>
				Summary
			</Link>
			<Link
				color="inherit"
				href="/getting-started/installation/"
				onClick={handleClick}
			>
				Getting Started
			</Link>
			<Typography color="textPrimary">Q&A</Typography>
		</Breadcrumbs>
	)
}
