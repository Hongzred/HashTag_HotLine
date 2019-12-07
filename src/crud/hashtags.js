import { API, graphqlOperation } from 'aws-amplify'
import { listHashtags } from '../graphql/queries' // GraphQL queries that is auto genarate from the DB scheme (read function)
import {
	createHashtag,
	updateHashtag,
} from '../graphql/mutations'

const createUserHashtag = async (hashtagName, settingsId) => {
    // We add a hashtag to the hashtag table by adding its name & the settings it belong to.
    if(hashtagName){
       	await API.graphql(
		graphqlOperation(createHashtag, {
			input: {
				name: hashtagName,
				hashtagSettingId: settingsId,
			},
		}),
    ) 
    return hashtagName
    }
    return undefined

}


export {
	updateUserHashtag,
	getHashtagIdByName,
	getUserHashtags,
	createUserHashtag
}