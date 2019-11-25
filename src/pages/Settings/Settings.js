import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { listSettings as allSettings } from "../../custom_graphql/queries";
import { listHashtags } from "../../graphql/queries";
import {
    createSetting,
    updateSetting,
    createHashtag,
    deleteHashtag
} from "../../graphql/mutations";
import symmetricDifference from "../../utils/symmetricDifference";

const dummySettings = {
    botMessage: "Your report is in review",
    hashtags: ["#abc", "#cba", "#qwe"]
};
export default class Settings extends Component {
    state = {
        botMessage: "",
        hashtags: []
    };
    settingsId = null;

    async componentDidMount() {
        this.setState(dummySettings); //We need to initialize w/ real settings from DB
        await this.createUserSettings();
    }

    async getUserSettings() {
        const {
            data: {
                listSettings: { items }
            }
        } = await API.graphql(graphqlOperation(allSettings));
        const settings = items[0];
        if (items[0]) this.settingsId = settings.id;

        return settings;
    }

    async getHashtagByName(hashtag) {
        const {
            data: {
                listHashtags: { items }
            }
        } = await API.graphql(graphqlOperation(listHashtags));
        const filteredHashtags = items.filter(({ name }) => name === hashtag);
        if (filteredHashtags[0]) return filteredHashtags[0].id;
    }
    //We should create a lambda function instead to be trigger once the user signs in.
    //This creates a settings entry in the databases for the user. User will only have 1 settings
    async createUserSettings() {
        let settings = await this.getUserSettings();
        if (!settings) {
            settings = await API.graphql(
                graphqlOperation(createSetting, { input: { botMessage: " " } })
            );
        }
    }

    async updateUserSettings({ botMessage, hashtags }) {
        const {
            id,
            botMessage: botMessageSettings,
            hashtags: { items: hashtagSettings }
        } = await this.getUserSettings();
        const oldHashtags = hashtagSettings.map(({ name }) => name);
        const arrayDifferences = symmetricDifference(hashtags, oldHashtags);
        arrayDifferences.forEach(async hashtag => {
            if (hashtags.includes(hashtag)) {
                await API.graphql(
                    graphqlOperation(createHashtag, {
                        input: {
                            name: hashtag,
                            hashtagSettingId: this.settingsId
                        }
                    })
                );
                console.log(`Write ${hashtag}`);
            } else {
                const removeId = await this.getHashtagByName(hashtag);
                await API.graphql(
                    graphqlOperation(deleteHashtag, { input: { id: removeId } })
                );
                console.log(`Delete ${hashtag}`);
            }
        });
        await API.graphql(
            graphqlOperation(updateSetting, {
                input: {
                    id: this.settingsId,
                    botMessage
                }
            })
        );
    }

    onMessageChange = e => {
        this.setState({
            botMessage: e.target.value
        });
    };

    onHashtagsChange = e => {
        this.setState({
            hashtags: e
        });
    };

    onSave = async e => {
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
