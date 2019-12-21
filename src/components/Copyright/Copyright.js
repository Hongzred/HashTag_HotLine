import React from 'react'
import { Link, Typography } from '@material-ui/core'

/**
 * Copyright Component
 *
 * this contains copyrights (project name & date)
 * 
 * @component copyright
 * @example
 * return (
 * <Copyright/ >)
 */

const Copyright = () => {
	return (
		<Typography
			variant="body2"
			color="textSecondary"
			align="center"
			data-testid="copyright"
		>
			{'Copyright © '}
			<Link color="inherit" href="/">
				Hashtag Hotline
			</Link>{' '}
			<span>{new Date().getFullYear()}</span>
			{'.'}
		</Typography>
	)
}

export default Copyright;