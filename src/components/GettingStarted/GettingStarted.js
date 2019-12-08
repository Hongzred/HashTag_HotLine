import React from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
	root: {
		width: '100%',
		maxWidth: 500,
	},
	li: {
		margin: '10px 0',
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
					<li>
						Go to your setting and set up your hashtags
						<ul>
							<li>enter the hashtags you want to search</li>
							<li>customize the bot message</li>
						</ul>
					</li>
					<li>View the results in the overview page</li>
					<li>
						Reply the tweet with actions
						<ButtonGroup
							size="small"
							width="auto"
							aria-label="full width outlined button group"
						>
							<Button>Resolved</Button>
							<Button>Pending</Button>
							<Button>Custom</Button>
						</ButtonGroup>
					</li>
					<li>
						you can also filter the results by distances and time!
					</li>
				</ol>
			</Typography>
		</div>
	)
}
