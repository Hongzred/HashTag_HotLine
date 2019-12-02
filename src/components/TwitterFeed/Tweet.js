import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

export default function Tweet(props) {
	// TODO: Ideally, want the hashtags in the body text to be highlighted
	// or bolded somehow. How could this be accomplished with Typography components?

	// <Typography
	//  component="span"
	//  variant="body2"
	//  className={classes.inline}
	//  color="textPrimary"
	// >
	//  Ali Connors
	// </Typography>

	const primary = `${props.full_name}  (${props.twitter_handle})`

	return (
		<ListItem alignItems="flex-start">
			<ListItemAvatar>
				<Avatar alt={props.full_name} src={props.profile_pic} />
			</ListItemAvatar>
			<ListItemText
				primary={primary}
				secondary={<>{props.tweet_body}</>}
			/>
		</ListItem>
	)
}
