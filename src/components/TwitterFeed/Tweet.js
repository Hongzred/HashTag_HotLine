import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

export default function Tweet(props) {
	const primary = `${props.full_name}  (${props.twitter_handle})`

	return (
		<ListItem alignItems="flex-start" divider>
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

				<Grid item width="auto">
					<ButtonGroup
						size="small"
						width="auto"
						aria-label="full width outlined button group"
					>
						<Button>Resolved</Button>
						<Button>Pending</Button>
						<Button>Custom</Button>
					</ButtonGroup>
				</Grid>
			</Grid>
		</ListItem>
	)
}
