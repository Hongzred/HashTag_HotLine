import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

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
		<div className={classes.root} data-testid="summary">
			{/* <Typography variant="h2" gutterBottom className="bold">
				Summary
			</Typography> */}
			<h1>Summary</h1>
			<Divider />
			<Typography variant="body1" gutterBottom >
				- Hashtag hotline is a dashboard application with a live feed
				and map to show where the public is reporting problems.
			</Typography>

			<h3>our goals:</h3>
			<ul>
				<li>visualized issues in form of map and charts</li>
				<li>
					notify customer with any updates of the issue in real-time
					providing peace of mind (through a Twitter bot)
				</li>
			</ul>
		</div>
	)
}
