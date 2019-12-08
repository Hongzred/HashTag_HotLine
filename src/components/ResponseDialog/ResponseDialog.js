import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
import Container from '@material-ui/core/Container'
import ButtonlessTweet from '../TwitterFeed/ButtonlessTweet'

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}))

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

export default function ResponseDialog(props) {
	const classes = useStyles()
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			<ButtonGroup
				size="small"
				width="auto"
				aria-label="full width outlined button group"
			>
				<Button>Resolved</Button>
				<Button
					variant="outlined"
					color="primary"
					onClick={handleClickOpen}
				>
					Custom
				</Button>
				<Button>Spam</Button>
			</ButtonGroup>

			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Response
						</Typography>
						<Button autoFocus color="inherit" onClick={handleClose}>
							Send
						</Button>
					</Toolbar>
				</AppBar>

				<Container maxWidth="lg" className={classes.container}>
					<Grid spacing={3} center>
						{/* Tweet */}
						<Grid item xs={12} md={4} lg={4} center>
							<Paper className={fixedHeightPaper}>
								<ButtonlessTweet
									key={props.key}
									full_name={props.full_name}
									twitter_handle={props.twitter_handle}
									profile_pic={props.profile_pic}
									tweet_body={props.tweet_body}
								/>
							</Paper>
						</Grid>

						{/* TextBox */}
						<TextField
							multiline
							fullWidth
							margin="normal"
							rows={10}
							rowsMax={10}
							variant="outlined"
							label="Your Response"
						/>
					</Grid>
				</Container>
			</Dialog>
		</div>
	)
}
