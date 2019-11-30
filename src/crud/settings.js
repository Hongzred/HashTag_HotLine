import { API, graphqlOperation } from "aws-amplify";
import symmetricDifference from "../utils/symmetricDifference";
import { listSettings } from "../custom_graphql/queries"; // My custum query to be for get all item without pagination.
import { listHashtags } from "../graphql/queries"; //GraphQL queries that is auto genarate from the DB scheme (read function)
import {
    createSetting,
    updateSetting,
    createHashtag,
    deleteHashtag
} from "../graphql/mutations"; //GraphQL mutations that is auto genarate from the DB scheme (write functions)

const getUserSettings = async () => {
    const {
        data: {
            listSettings: { items } //We use destructoring to get user settings (items)
        }
    } = await API.graphql(graphqlOperation(listSettings)); 
    const settings = items[0]; // Since each user have only one settings we get the first element in items
    return settings; 
}


const createUserSettings = async () => {
    //This creates a settings entry in the setting table if a user don't already have one. 
    //This should be a lambda function that is triggers when an user login.
    let settings = await getUserSettings();
    if (!settings) {
        settings = await API.graphql(
            graphqlOperation(createSetting, { input: { botMessage: " " } }) //We will set hashtags with its corresponding settingsId in hashtag table
        );
    }
}

const createUserHashtag = async (hashtagName, settingsId) => {
    //We add a hashtag to the hashtag table by adding its name & the settings it belong to.
    await API.graphql(
        graphqlOperation(createHashtag, { 
            input: {
                name: hashtagName,
                hashtagSettingId: settingsId
            }
        })
    );
}

const getHashtagByName = async (hashtag) => {
    const {
        data: {
            listHashtags: { items } //We use destructoring to get hashtag by it name (items)
        }
    } = await API.graphql(graphqlOperation(listHashtags));
    const filteredHashtags = items.filter(({ name }) => name === hashtag); //We filter the users list of hashtags to get the one we need
    if (filteredHashtags[0]) return filteredHashtags[0].id; // Since a user  will not have duplicate hashtags we get the first element in array if it exist
}

const removeUserHashtag = async (hashtagName) => {
    //We remove a hashtag by it Name since there is only one specific hashtag name per user.
    const removeId = await getHashtagByName(hashtagName); 
    await API.graphql(
        graphqlOperation(deleteHashtag, { input: { id: removeId } }) //We remove the hashtag by its id
    );
}

const updateUserMessage  = async (settingsId, botMessage) => {
    //We update a botMessage with it settingsId.
    await API.graphql(
        graphqlOperation(updateSetting, {
            input: {
                id: settingsId,
                botMessage
            }
        })
    );
}


const updateUserSettings  = async ({ botMessage, hashtags, settingsId}) => {
    const { 
        hashtags: { items: hashtagSettings }
    } = await getUserSettings(); //We destructure to get hashtag setting 
    const oldHashtags = hashtagSettings.map(({ name }) => name); // oldHashtags represents the hashtag (names) that we have in the DB
    const arrayDifferences = symmetricDifference(hashtags, oldHashtags); // We get the differences between the user changes & oldHashtags
    arrayDifferences.forEach(async hashtag => { //If the difference between them is in the user input we need to add it to the DB, otherwise delete it
        if (hashtags.includes(hashtag)) { 
            await createUserHashtag(hashtag, settingsId)
        } else {                 
            await removeUserHashtag(hashtag)
        }
    });
    if(botMessage === "") botMessage = " " // Empty string produces error in DB
    await updateUserMessage(settingsId, botMessage) //We finally add the botMessage to the DB

}

export {
    getUserSettings,
    updateUserSettings,
    updateUserMessage,
    removeUserHashtag,
    getHashtagByName,
    createUserHashtag,
    createUserSettings 
}
