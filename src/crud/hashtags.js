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
		const name = hashtagInfo.name
		const isInSettings = !!hashtagInfo.setting
		const isSearchable =  true
        const {id} = hashtagInfo
        return {id, name, isInSettings, isSearchable}
    })
}

const getHashtagIdByName = async hashtagName => {
	if(hashtagName){
			const hashtags = await getUserHashtags()
	const filteredHashtags = hashtags.filter(({ name }) => name === hashtagName) // We filter the users list of hashtags to get the one we need
	if (filteredHashtags[0]) return filteredHashtags[0].id // Since a user  will not have duplicate hashtags we get the first element in array if it exist
	return undefined
	}
	return undefined

}

const updateUserHashtag = async (hashtagId, update) => {
	// We remove a hashtag by it Name since there is only one specific hashtag name per user.

	if (hashtagId && update) {
		await API.graphql(
			graphqlOperation(updateHashtag, {
				input: { id: hashtagId, ...update },
			}), // We remove the hashtag by its id
		)
		return { id: hashtagId, ...update }
	}
	return undefined
}


export {
	getUserHashtags,
	createUserHashtag,
	getHashtagIdByName,
	updateUserHashtag

}