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

export default function ResponseDialog() {
	const classes = useStyles()
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

				<TextField
					multiline
					margin="normal"
					style={{ margin: 30 }}
					rows={10}
					rowsMax={10}
					variant="outlined"
					label="Your Response"
				/>
			</Dialog>
		</div>
	)
}
