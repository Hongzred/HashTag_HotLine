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

const getUserHashtags = async () => {
	const {
		data: {
			listHashtags: { items }, // We use destructoring to get hashtag by it name (items)
		},
	} = await API.graphql(graphqlOperation(listHashtags))
	return items.map((hashtagInfo) => {
        const hashtag = hashtagInfo.name
        const isInSettings = !!hashtagInfo.setting
        const {id} = hashtagInfo
        return {id, hashtag, isInSettings}
    })
}


export {
	getUserHashtags,
	createUserHashtag
}