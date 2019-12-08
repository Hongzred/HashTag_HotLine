import { API, graphqlOperation } from 'aws-amplify'
import symmetricDifference from '../utils/symmetricDifference'
import { listSettings } from '../custom_graphql/queries' // GraphQL queries that is auto genarate from the DB scheme (read function)
import { createSetting, updateSetting } from '../graphql/mutations' // GraphQL mutations that is auto genarate from the DB scheme (write functions)
import {
	updateUserHashtag,
	getHashtagIdByName,
	getUserHashtags,
	createUserHashtag,
} from './hashtags'

const getUserSettings = async () => {
	const {
		data: {
			listSettings: { items }, // We use destructoring to get user settings (items)
		},
	} = await API.graphql(
		graphqlOperation(listSettings, {
			limit: 1,
		}),
	)
	const settings = items[0] // Since each user have only one settings we get the first element in items
	return settings // If empty dont transform
}

const createUserSettings = async settings => {
	// This creates a settings entry in the setting table if a user don't already have one.
	// This should be a lambda function that is triggers when an user login.

	// let settings = await getUserSettings()
	let data = settings

	if (!data) {
		const {
			data: {
				createSetting: userSettings, // We use destructoring to get user settings (items)
			},
		} = await API.graphql(
			graphqlOperation(createSetting, { input: {} }), // We will set hashtags with its corresponding settingsId in hashtag table
		)
		data = userSettings
	}
	return {
		hashtags: data.hashtags.items.map(({ id, name, setting}) => ({
			id,
			name, 
			isInSettings: true,
			isSearchable: true,
		})),
		botMessage: data.botMessage,
		settingsId: data.id,
	}
}

const updateUserMessage = async (settingsId, botMessage) => {
	// We update a botMessage with it settingsId.
	let data = botMessage
	if (settingsId) {
		if (!data) data = null
		await API.graphql(
			graphqlOperation(updateSetting, {
				input: {
					id: settingsId,
					botMessage:data,
				},
			}),
		)
		return data
	}
	return undefined
}

const updateUserSettings = async ({ botMessage, hashtags, settingsId }, handleDelete, handleAdd) => {
	let oldHashtags = await getUserHashtags() // We destructure to get hashtag setting
	const hashtagNames = hashtags.map(({name}) => name)
	oldHashtags = oldHashtags
		.filter(({ isInSettings }) => isInSettings)
		.map(({ name }) => name) // oldHashtags represents the hashtag (names) that we have in the DB
	const arrayDifferences = symmetricDifference(hashtagNames, oldHashtags) // We get the differences between the user changes & oldHashtags
	arrayDifferences.forEach(async hashtag => {
		// If the difference between them is in the user input we need to add it to the DB, otherwise delete it
		const hashtagId = await getHashtagIdByName(hashtag)

		if (hashtagNames.includes(hashtag)) {
			if (hashtagId) {
				await updateUserHashtag(hashtagId, {
					hashtagSettingId: settingsId,
					
				})
				handleAdd(hashtag)
			} else {
				await createUserHashtag(hashtag, settingsId)
			}
			

		} else {
			await updateUserHashtag(hashtagId, {
				hashtagSettingId: null,
			})
			handleDelete(hashtag)
		}
	})
	await updateUserMessage(settingsId, botMessage)
}

export {
	getUserSettings,
	updateUserSettings,
	updateUserMessage,
	createUserSettings,
}
