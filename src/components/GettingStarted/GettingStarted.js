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
		overflow: 'auto',
	},
	li: {
		margin: '10px 0',
	},
	image: {
		width: '120px',
		height: '120px',
	},
	image__tweet: {
		width: '120px',
		heigh: '200px',
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
							<img
								className={classes.image}
								src="https://i.imgur.com/IHfmcN5.png"
								alt="setting"
							/>
						</ul>
					</li>
					<li>View the results in the overview page</li>
					<img
						className={classes.image__tweet}
						src="https://i.imgur.com/4WFAj0Z.png"
						alt="tweet"
					/>
					<li>Reply the tweet with actions</li>
					<ButtonGroup
						size="small"
						width="auto"
						aria-label="full width outlined button group"
					>
						<Button>Resolved</Button>
						<Button>Pending</Button>
						<Button>Custom</Button>
					</ButtonGroup>
					<li>
						you can also filter the results by distances and time!
					</li>
				</ol>
			</Typography>
		</div>
	)
}
