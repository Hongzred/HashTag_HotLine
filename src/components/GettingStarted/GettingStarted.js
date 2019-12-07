import React from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	root: {
		width: '100%',
		maxWidth: 500,
	},
})
export default function GettingStarted() {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<h1>Getting Started</h1>
			<Divider />
			<Typography variant="body1" gutterBottom>
				<ol>
					<li>Create an account using your email</li>
				</ol>
			</Typography>
		</div>
	)
}
