const T = require('./twitterConfig')

const fetchTweets = async hashtag => {
	if (hashtag) {
		let json
		try {
			const { data } = await T.get('search/tweets', {
				q: `#${hashtag}`,
				result_type: 'recent',
				count:100
			})
			json = data.statuses.map(jsonObject => {
				try {
					const filteredData = {
						postDate: jsonObject.created_at,
						postId: jsonObject.id_str,
						post: jsonObject.text,
						hashtags: jsonObject.entities.hashtags.map(
							obj => obj.text,
						),

						userId: jsonObject.user.id_str,
						username: jsonObject.user.name,
						location: {
							longitude:
								jsonObject.place.bounding_box
									.coordinates[0][0][0],
							latitude:
								jsonObject.place.bounding_box
									.coordinates[0][0][1],
						},
					}
					return filteredData
				} catch {
					return null
				}
			})
		} catch (err) {
			json = []
		} finally {
			return json
		}
	} else {
		return []
	}
}


export default fetchTweets
// const T = require('./twitterConfig')

// const fetchTweets = async hashtag => {
// 	if (hashtag) {
// 		let json
// 		let shouldBeEmpty = false
// 		try {
// 			let { data } = await T.get('search/tweets', {
// 				q: `#${hashtag}`,
// 				result_type: 'recent',
// 			})
// 			json = data.statuses.map(jsonObject => {
// 				const keys = [
// 					'created_at',
// 					'id_str',
// 					'text',
// 					'entities',
// 					'user',
// 					'place',
// 				]
// 				const validKeys = keys.filter(key => !!jsonObject[key])
// 				if (keys.length === validKeys.length) {
// 					return {
// 						postDate: jsonObject.created_at,
// 						postId: jsonObject.id_str,
// 						post: jsonObject.text,
// 						hashtags: jsonObject.entities.hashtags.map(
// 							obj => obj.text,
// 						),

// 						userId: jsonObject.user.id_str,
// 						username: jsonObject.user.name,
// 						location: {
// 							longitude:
// 								jsonObject.place.bounding_box
// 									.coordinates[0][0][0],
// 							latitude:
// 								jsonObject.place.bounding_box
// 									.coordinates[0][0][1],
// 						},
// 					}
// 				}
// 				return null
// 			})
// 		} catch (err) {
// 			json = []
// 		} 
// 		return json
// 	} else {
// 		return []
// 	}
// }

// export default fetchTweets
