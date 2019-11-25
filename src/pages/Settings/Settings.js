import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import symmetricDifference from "../../utils/symmetricDifference";
import { listSettings } from "../../custom_graphql/queries"; // My custum query to be for get all item without pagination.
import { listHashtags } from "../../graphql/queries"; //GraphQL queries that is auto genarate from the DB scheme (read function)
import {
    createSetting,
    updateSetting,
    createHashtag,
    deleteHashtag
} from "../../graphql/mutations"; //GraphQL mutations that is auto genarate from the DB scheme (write functions)

export default class Settings extends Component {
    state = {
        botMessage: "",
        hashtags: []
    };
    settingsId = null;


   // ====================================================== Backend Connection Logic Below ========================================================= //

    async componentDidMount() {
        await this.createUserSettings(); //When the page mounts we create user settings if we need to
        const {
            botMessage, 
            hashtags: { items: hashtags }
        } = await this.getUserSettings() //We get the user settings for initial display
        const hashtagNames = hashtags.map(({ name }) => name);
        this.setState({botMessage, hashtags:hashtagNames}); //We need to initialize w/ real settings from DB
    }

    async getUserSettings() {
        const {
            data: {
                listSettings: { items } //We use destructoring to get user settings (items)
            }
        } = await API.graphql(graphqlOperation(listSettings)); 
        const settings = items[0]; // Since each user have only one settings we get the first element in items
        if (items[0]) this.settingsId = settings.id; // We store the users settingId if the user have a settings
        return settings; 
    }

    
    async createUserSettings() {
        //This creates a settings entry in the setting table if a user don't already have one. 
        //This should be a lambda function that is triggers when an user login.
        let settings = await this.getUserSettings();
        if (!settings) {
            settings = await API.graphql(
                graphqlOperation(createSetting, { input: { botMessage: " " } }) //We will set hashtags with its corresponding settingsId in hashtag table
            );
        }
    }

    async createUserHashtag(hashtagName, settingsId) {
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

    async getHashtagByName(hashtag) {
        const {
            data: {
                listHashtags: { items } //We use destructoring to get hashtag by it name (items)
            }
        } = await API.graphql(graphqlOperation(listHashtags));
        const filteredHashtags = items.filter(({ name }) => name === hashtag); //We filter the users list of hashtags to get the one we need
        if (filteredHashtags[0]) return filteredHashtags[0].id; // Since a user  will not have duplicate hashtags we get the first element in array if it exist
    }

    async removeUserHashtag(hashtagName) {
        //We remove a hashtag by it Name since there is only one specific hashtag name per user.
        const removeId = await this.getHashtagByName(hashtagName); 
        await API.graphql(
            graphqlOperation(deleteHashtag, { input: { id: removeId } }) //We remove the hashtag by its id
        );
    }

    async updateUserMessage(settingsId, botMessage) {
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

    
    async updateUserSettings({ botMessage, hashtags }) {
        const { 
            hashtags: { items: hashtagSettings }
        } = await this.getUserSettings(); //We destructure to get hashtag setting 
        const oldHashtags = hashtagSettings.map(({ name }) => name); // oldHashtags represents the hashtag (names) that we have in the DB
        const arrayDifferences = symmetricDifference(hashtags, oldHashtags); // We get the differences between the user changes & oldHashtags
        arrayDifferences.forEach(async hashtag => { //If the difference between them is in the user input we need to add it to the DB, otherwise delete it
            if (hashtags.includes(hashtag)) { 
                await this.createUserHashtag(hashtag, this.settingsId)
                console.log(1)
            } else {                 
                await this.removeUserHashtag(hashtag)
                console.log(2)

            }
        });
        if(botMessage === "") botMessage = " " // Empty string produces error in DB
        await this.updateUserMessage(this.settingsId, botMessage) //We finally add the botMessage to the DB
        console.log(3)

    }

   // ====================================================== UI Logic Below ========================================================= //

    onMessageChange = e => { //Controlling User input for the botMessage input field
        this.setState({
            botMessage: e.target.value
        });
    };

    onHashtagsChange = e => { //Controlling User input for the hashtag input field
        this.setState({
            hashtags: e
        });
    };

    onSave = async e => { //We CRUD the database when user save changes.
        e.preventDefault();
        await this.updateUserSettings(this.state);
    };

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: 20,
                    padding: 20
                }}
            >
                <form style={{ width: "80%" }} onSubmit={this.onSave}>
                    <ChipInput
                        defaultValue={this.state.hashtags}
                        fullWidth
                        label="Hashtags"
                        placeholder="Type and press enter to add hashtags"
                        onChange={this.onHashtagsChange}
                    />
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="botMessage">
                            Bot Message
                        </InputLabel>
                        <Input
                            id="botMessage"
                            type="text"
                            onChange={this.onMessageChange}
                            value={this.state.botMessage}
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        type="submit"
                    >
                        Save
                    </Button>
                </form>
            </div>
        );
    }
}
