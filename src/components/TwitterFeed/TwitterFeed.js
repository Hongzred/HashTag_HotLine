import React from 'react'
import Tweet from './Tweet'
import { UserStateContext } from '../../context/UserContext'

export default function TwitterFeed() {

	const list = (
		<UserStateContext.Consumer>
			{context =>
				context.reports.map(({postId,id, username,userScreenName, userProfilePic, post}) => (
					<>
						<Tweet
							key={postId}
							full_name={username}
						onSpamClick={context.onSpamClick}
						reportId={id}

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
