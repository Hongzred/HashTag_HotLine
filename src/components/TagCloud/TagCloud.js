import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { UserStateContext } from '../../context/UserContext'
import Tag from '../Tag/Tag'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		padding: theme.spacing(0.5),
	},
	chip: {
		margin: theme.spacing(0.5),
	},
}))

function setDeleteIcon(isSearchable) {
	if (isSearchable === true) {
		return <HighlightOffIcon />
	}

	return <AddCircleIcon />
}

function setColor(isSearchable){
	if(isSearchable === true){
		return 'primary'
	}
	return '#b3b3b3'
}



function toggleChip(defaultHashtag,onHashtagDisable,onHashtagEnable){
	if (defaultHashtag.isSearchable === true) {
		return onHashtagDisable
	}

	return onHashtagEnable
}

// this arrow function returns ANOTHER arrow function
	// so the handler has to be passed an argument
	// handleDelete(chip) gets you a function to delete the chip
	// so it isn't executed immediately (as might be the case if
	// the function returned a primitive like a number or object or something

	// not using the disabled prop because that makes it impossible to click the tag
	// to reactivate it.
// const handleDelete = chipToDelete => () => {
// 	setChipData(chips =>
// 		chips.map(chip => {
// 			if (chip.key === chipToDelete.key) {
// 				if (chip.active === true) {
// 					return {
// 						...chip,
// 						active: false,
// 						color: '#b3b3b3',
// 					}
// 				}
// 				return {
// 					...chip,
// 					active: true,
// 					color: 'primary',
// 				}
// 			}
// 			return chip
// 		}),
// 	)
// }

export default function TagCloud(){
	const classes = useStyles()
	return (
		<UserStateContext.Consumer>
			{({defaultHashtags,onHashtagDisable,onHashtagEnable}) => (

				<div className={classes.root}>
					{defaultHashtags.map(defaultHashtag => {
						return (
							<Tag
								key={defaultHashtag.id}
								label={defaultHashtag.name}
								onDisable={onHashtagDisable}
								onEnable={onHashtagEnable}
								className={classes.chip}
							/>
						)
					})}
				</div>
			)}
		</UserStateContext.Consumer>
	)
}
