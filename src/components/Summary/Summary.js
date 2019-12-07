import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	root: {
		width: '100%',
		maxWidth: 500,
	},
	bold: {
		fontweight: 'bold',
	},
})

export default function Summary() {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			{/* <Typography variant="h2" gutterBottom className="bold">
				Summary
			</Typography> */}
			<h1>Summary</h1>
			<Typography variant="body1" gutterBottom>
				Hashtag hotline is a dashboard application with a live feed and
				map to show where the public is reporting problems.
			</Typography>
		</div>
	)
}
