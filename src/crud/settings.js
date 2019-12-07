import { API, graphqlOperation } from 'aws-amplify'
import symmetricDifference from '../utils/symmetricDifference'
import { listSettings } from '../custom_graphql/queries' // GraphQL queries that is auto genarate from the DB scheme (read function)
import {
	createSetting,
	updateSetting
} from '../graphql/mutations' // GraphQL mutations that is auto genarate from the DB scheme (write functions)
import { updateUserHashtag,
	getHashtagIdByName,
    getUserHashtags,
	createUserHashtag} from "./hashtags"

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

const createUserSettings = async (settings) => {
	// This creates a settings entry in the setting table if a user don't already have one.
	// This should be a lambda function that is triggers when an user login.
	
	// let settings = await getUserSettings()

	if (!settings) {
		const {
			data: {
				createSetting: userSettings, // We use destructoring to get user settings (items)
			},
		} = await API.graphql(
			graphqlOperation(createSetting, { input: {} }), // We will set hashtags with its corresponding settingsId in hashtag table
		)
		settings = userSettings
	}
	return {
		hashtags: settings.hashtags.items.map(({ name }) => name),
		botMessage: settings.botMessage,
		settingsId: settings.id,
	}
}


const updateUserMessage = async (settingsId, botMessage) => {
	// We update a botMessage with it settingsId.
	if(settingsId) {
		if(!botMessage) botMessage = null
		await API.graphql(
			graphqlOperation(updateSetting, {
				input: {
					id: settingsId,
					botMessage,
				},
			}),
		)
		return botMessage
	}
	return undefined
}

const updateUserSettings = async ({ botMessage, hashtags, settingsId }) => {
	let oldHashtags = await getUserHashtags() // We destructure to get hashtag setting
	oldHashtags = oldHashtags
		.filter(({ isInSettings }) => isInSettings)
		.map(({ hashtag }) => hashtag) // oldHashtags represents the hashtag (names) that we have in the DB
	const arrayDifferences = symmetricDifference(hashtags, oldHashtags) // We get the differences between the user changes & oldHashtags
	arrayDifferences.forEach(async hashtag => {
		// If the difference between them is in the user input we need to add it to the DB, otherwise delete it
		const hashtagId = await getHashtagIdByName(hashtag)

		if (hashtags.includes(hashtag)) {
			if (hashtagId) {
				await updateUserHashtag(hashtagId, {
					hashtagSettingId: settingsId,
				})
			} else {
				await createUserHashtag(hashtag, settingsId)
			}
		} else {
			await updateUserHashtag(hashtagId, {
				hashtagSettingId: null,
			})
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
