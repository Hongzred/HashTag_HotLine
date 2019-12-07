import React from 'react'
import { Link, Typography } from '@material-ui/core'

export default function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center"  data-testid="copyright">
			{'Copyright © '}
			<Link color="inherit" href="/">
				Hashtag Hotline
			</Link>{' '}
			<span>{new Date().getFullYear()}</span>
			{'.'}
		</Typography>
	)
}
