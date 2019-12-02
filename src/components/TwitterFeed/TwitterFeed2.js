import React from 'react'
import Divider from '@material-ui/core/Divider'
import Tweet from './Tweet'

export default function TwitterFeed() {
	const dummyData = [
		{
			full_name: 'Remy Sharp',
			twitter_handle: '@r_sharp',
			profile_pic: 'https://material-ui.com/static/images/avatar/1.jpg',
			tweet_body:
				'Help! @ConEd #gasleak on at Rector St Station in Manhattan!',
		},

		{
			full_name: 'Travis Howard',
			twitter_handle: '@travie_howie',
			profile_pic: 'https://material-ui.com/static/images/avatar/2.jpg',
			tweet_body: 'Rotten egg smell near E 23rd st. @ConEd #gasleak',
		},

		{
			full_name: 'Cindy Baker',
			twitter_handle: '@bake_a_cake',
			profile_pic: 'https://material-ui.com/static/images/avatar/3.jpg',
			tweet_body:
				"There's a down power line at 232nd st and Tibett st in the Bronx @ConEc #electrical",
		},
	]

	const list = dummyData.map(tweet => (
		<>
			<Tweet
				full_name={tweet.full_name}
				twitter_handle={tweet.twitter_handle}
				profile_pic={tweet.profile_pic}
				tweet_body={tweet.tweet_body}
			/>
			<Divider variant="inset" component="li" />
		</>
	))

	return <>{list}</>
}
