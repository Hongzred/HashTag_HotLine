import React from 'react'
import { Grid, Paper, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

// styles
import useStyles from './styles'

export default function Error() {
	const classes = useStyles()

	return (
		<Grid container className={classes.container}>
			<Paper classes={{ root: classes.paperRoot }}>
				<Typography
					variant="h1"
					color="primary"
					className={classnames(classes.textRow, classes.errorCode)}
				>
					404
				</Typography>
				<Typography
					variant="h5"
					color="primary"
					className={classes.textRow}
				>
					Oops. Looks like the page you are looking for does not
					exists
				</Typography>
				<Button
					variant="contained"
					color="primary"
					component={Link}
					to="/"
					size="large"
					className={classes.backButton}
				>
					Back to Home
				</Button>
			</Paper>
		</Grid>
	)
}
