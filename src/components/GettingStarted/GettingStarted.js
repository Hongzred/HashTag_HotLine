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
		height: '200px',
	},
	image__hashtag: {
		width: '200px',
		height: '120px'
	},
	bold: {
		fontWeight: 'bold'
	},
	image__response: {
		width: '270px',
		height: '170px'
	}
})

/**
 * Getting Started Component
 * 
 * this contains all user needs to know in order to use the app
 * @component
 * @example
 * return (
 * <GettingStarted/ >) 
 */

export default function GettingStarted() {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<h1>Getting Started</h1>
			<Divider />
			<Typography variant="body1" gutterBottom data-testid="gettingstarted">
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
					<ul>
						<li><span className={classes.bold}>customize your messages and click send</span></li>
						<img className={classes.image__response} src="https://i.imgur.com/Al40ny8.png" alt="resonse" />
					</ul>
					<li>
						you can also filter the results
						<ul>
							<li><span className={classes.bold}>filter by hashtags:</span> select or enter the hashtag on the top</li>
							<img className={classes.image__hashtag} src='https://i.imgur.com/NdHTi1M.png' alt="filter-hashtag" />
						</ul>
					</li>
				</ol>
			</Typography>
		</div>
	)
}
