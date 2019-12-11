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
import Box from '@material-ui/core/Box'
import ButtonlessTweet from '../TwitterFeed/ButtonlessTweet'
import { UserStateContext } from '../../context/UserContext'
import {replyToReport} from '../../crud/reports'

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

function resolvedBotMessage(props){

	return(
		<UserStateContext.Consumer>
			{context => (
				<Box p={10} mx="auto" >
					<Typography variant="h2">
						Would you like to send this automated response?
					</Typography>
					<Grid item xs={12} md={4} lg={4}>
						<Paper >
							<ButtonlessTweet
								full_name="Automated Response"
								twitter_handle="@coned"
								profile_pic="https://i.imgur.com/CgFCxPt.jpg"
								tweet_body={context.state.settings.botMessage}
							/>
						</Paper>
					</Grid>
				</Box>
			)}
		</UserStateContext.Consumer>	
	)

}


export default function ResponseDialog(props) {
	const classes = useStyles()
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

	const [open, setOpen] = React.useState(false)
	const [buttonChoice, setButtonChoice] = React.useState()
	const [componentChoice, setComponentChoice] = React.useState()
	const [textInput, setTextInput] = React.useState('')


	const handleClickOpen = (button) => {
		if (button==='Resolved') {
			setComponentChoice(resolvedBotMessage())
		}
		else if (button==='Custom') {
			setComponentChoice(<TextField
								multiline
								fullWidth
								margin="normal"
								rows={10}
								rowsMax={10}
								variant="outlined"
								label="Your Response"
								onChange={e => setTextInput(e.target.value)}
							/>)
	    } else if (button==='Spam'){
			// setComponentChoice(<h1>Mark as spam?</h1>)
			props.onSpamClick(props.reportId)
			return setOpen(false)

	    }		
		setOpen(true)
	}

	const handleClose = (componentChoice) => {
		setComponentChoice('')
		setOpen(false)
	}

	const handleSend = (button, props, state) => {

		if (button==='Resolved') {
			props.state.onResolved()
		}
		else if (button==='Custom') {
			replyToReport(props.twitter_handle, props.key, props.tweet_body)

	    }	
		setComponentChoice('')
		setOpen(false)
	}

	return (
		<UserStateContext.Consumer>
			{state => (

			<div>
				<ButtonGroup
					size="small"
					width="auto"
					aria-label="full width outlined button group"
				>
					<Button
						variant="outlined"
						color="primary"
						onClick={ e => handleClickOpen('Resolved')}
					>
						Resolved
					</Button>
					<Button
						variant="outlined"
						color="primary"
						onClick={e => handleClickOpen('Custom')}
					>
						Custom
					</Button>
					<Button
						variant="outlined"
						color="primary"
						onClick={e => handleClickOpen('Spam')}
					>
						Spam
					</Button>

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
							<Button autoFocus color="inherit" onClick={e => handleSend(buttonChoice, props, state)}>
								Send
							</Button>
						</Toolbar>
					</AppBar>

					<Container maxWidth="lg" className={classes.container}>
						<Grid 
						spacing={3} 
						direction="column"
					    alignItems="center"
						center>
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
							{componentChoice}

						</Grid>
					</Container>
				</Dialog>
			</div>
			)}
		</UserStateContext.Consumer>	
	)
}
