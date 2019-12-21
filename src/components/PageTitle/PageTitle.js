import React from 'react'

// styles
import useStyles from './styles'

// components
import { Typography } from '../Wrappers/Wrappers'

/**
 * Page Title component
 * 
 * @component
 * @example
 * const title = "exampleTitle"
 * return (
 *   <PageTitle title={title} />
 * )
 */

const PageTitle = ({title}) => {
	const classes = useStyles()

	return (
		<div className={classes.pageTitleContainer} data-testid="pageTitle">
			<Typography className={classes.typo} variant="h1" size="sm">
				{title}
			</Typography>
		</div>
	)
}

export default PageTitle;