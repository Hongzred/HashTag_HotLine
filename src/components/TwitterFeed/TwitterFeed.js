import React from 'react'
import Tweet from './Tweet'
import { UserStateContext } from '../../context/UserContext'

export default function TwitterFeed() {
	// const dummyData = [
	// 	{
	// 		full_name: 'Remy Sharp',
	// 		twitter_handle: '@r_sharp',
	// 		profile_pic: 'https://material-ui.com/static/images/avatar/1.jpg',
	// 		tweet_body:
	// 			'Help! @ConEd #gasleak on at Rector St Station in Manhattan!',
	// 	},

	// 	{
	// 		full_name: 'Travis Howard',
	// 		twitter_handle: '@travie_howie',
	// 		profile_pic: 'https://material-ui.com/static/images/avatar/2.jpg',
	// 		tweet_body: 'Rotten egg smell near E 23rd st. @ConEd #gasleak',
	// 	},

	// 	{
	// 		full_name: 'Cindy Baker',
	// 		twitter_handle: '@bake_a_cake',
	// 		profile_pic: 'https://material-ui.com/static/images/avatar/3.jpg',
	// 		tweet_body:
	// 			"There's a down power line at 232nd st and Tibett st in the Bronx @ConEc #electrical",
	// 	},
	// ]

	// dummyData.map if need to  demo
	// const imageArr = [
	// 	'https://material-ui.com/static/images/avatar/1.jpg',
	// 	'https://material-ui.com/static/images/avatar/2.jpg',
	// 	'https://material-ui.com/static/images/avatar/3.jpg',
	// 	'https://material-ui.com/static/images/avatar/4.jpg',
	// 	'https://material-ui.com/static/images/avatar/5.jpg',
	// 	'https://material-ui.com/static/images/avatar/6.jpg',
	// 	'https://material-ui.com/static/images/avatar/7.jpg',
	// ]

	const list = (
		<UserStateContext.Consumer>
			{context =>
				context.reports.map(({postId, username,userScreenName, userProfilePic, post}) => (
					<>
						<Tweet
							key={postId}
							full_name={username}
							twitter_handle={`@${userScreenName}`}
							profile_pic={userProfilePic}
							tweet_body={post}
						/>
					</>
				))
			}
		</UserStateContext.Consumer>
	)

	return <>{list}</>
}
