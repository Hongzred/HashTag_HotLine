import { API, graphqlOperation } from 'aws-amplify'
import symmetricDifference from '../utils/symmetricDifference'
import { listHashtags } from '../graphql/queries' // GraphQL queries that is auto genarate from the DB scheme (read function)
import { listSettings } from '../custom_graphql/queries' // GraphQL queries that is auto genarate from the DB scheme (read function)
import {
	createSetting,
	updateSetting,
	createHashtag,
	updateHashtag,
} from '../graphql/mutations' // GraphQL mutations that is auto genarate from the DB scheme (write functions)

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

const createUserSettings = async () => {
	// This creates a settings entry in the setting table if a user don't already have one.
	// This should be a lambda function that is triggers when an user login.
	let settings = await getUserSettings()

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

const createUserHashtag = async (hashtagName, settingsId) => {
	// We add a hashtag to the hashtag table by adding its name & the settings it belong to.
	await API.graphql(
		graphqlOperation(createHashtag, {
			input: {
				name: hashtagName,
				hashtagSettingId: settingsId,
			},
		}),
	)
}

const getUserHashtags = async () => {
	const {
		data: {
			listHashtags: { items }, // We use destructoring to get hashtag by it name (items)
		},
	} = await API.graphql(graphqlOperation(listHashtags))
	return items
}

const getHashtagByName = async hashtag => {
	const hashtags = await getUserHashtags()
	const filteredHashtags = hashtags.filter(({ name }) => name === hashtag) // We filter the users list of hashtags to get the one we need
	if (filteredHashtags[0]) return filteredHashtags[0].id // Since a user  will not have duplicate hashtags we get the first element in array if it exist
	return undefined
}

const updateUserHashtag = async (hashtagId, update) => {
	// We remove a hashtag by it Name since there is only one specific hashtag name per user.

	if (hashtagId) {
		await API.graphql(
			graphqlOperation(updateHashtag, {
				input: { id: hashtagId, ...update },
			}), // We remove the hashtag by its id
		)
	}
}

const updateUserMessage = async (settingsId, botMessage) => {
	// We update a botMessage with it settingsId.
	await API.graphql(
		graphqlOperation(updateSetting, {
			input: {
				id: settingsId,
				botMessage,
			},
		}),
	)
}

const updateUserSettings = async ({ botMessage, hashtags, settingsId }) => {
	let oldHashtags = await getUserHashtags() // We destructure to get hashtag setting
	oldHashtags = oldHashtags
		.filter(({ setting }) => !!setting)
		.map(({ name }) => name) // oldHashtags represents the hashtag (names) that we have in the DB
	const arrayDifferences = symmetricDifference(hashtags, oldHashtags) // We get the differences between the user changes & oldHashtags
	arrayDifferences.forEach(async hashtag => {
		// If the difference between them is in the user input we need to add it to the DB, otherwise delete it
		const hashtagId = await getHashtagByName(hashtag)

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
	if (!botMessage) {
		await updateUserMessage(settingsId, null)
	} else {
		// Empty string produces error in DB
		await updateUserMessage(settingsId, botMessage)
	} // We finally add the botMessage to the DB
}

export {
	getUserSettings,
	updateUserSettings,
	updateUserMessage,
	updateUserHashtag,
	getHashtagByName,
	getUserHashtags,
	createUserHashtag,
	createUserSettings,
}
