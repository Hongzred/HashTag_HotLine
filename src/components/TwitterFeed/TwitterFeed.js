import React from 'react'
import Tweet from './Tweet'
import { UserStateContext } from '../../context/UserContext'

export default function TwitterFeed() {

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
