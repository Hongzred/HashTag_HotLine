import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'

import ResponseDialog from '../ResponseDialog/ResponseDialog'

export default function Tweet(props) {
	const primary = `${props.full_name}  (${props.twitter_handle})`

	return (
		<ListItem alignItems="flex-start" divider>
			{/* The Tweet */}
			<Grid container width="auto" spacing={3}>
				<Grid item width="auto">
					<ListItemAvatar>
						<Avatar alt={props.full_name} src={props.profile_pic} />
					</ListItemAvatar>
					<ListItemText
						primary={primary}
						secondary={<>{props.tweet_body}</>}
					/>
				</Grid>

				{/* The Buttons Along the Bottome of the Tweet */}
				<Grid item width="auto">
					<ResponseDialog
						key={props.key}
						postId={props.postId}

						full_name={props.full_name}
						onResolved={props.onResolved}
						reportId={props.reportId}
						onSpamClick={props.onSpamClick}
						twitter_handle={props.twitter_handle}
						profile_pic={props.profile_pic}
						tweet_body={props.tweet_body}
					/>
				</Grid>
			</Grid>
		</ListItem>
	)
}
