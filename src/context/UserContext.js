import React, {Component} from 'react'

// crud operations
import {
  updateUserSettings,
  getUserSettings,
  createUserSettings,
} from '../crud/settings'

const UserStateContext = React.createContext()

class UserProvider extends Component {
  state = {
    settings: {
      botMessage: '',
      hashtags: [],
      settingsId: null,
    },
  }

  async componentDidMount() {
    // console.log(this.routes()[0])
    await createUserSettings() // When the page mounts we create user settings if we need to
    const {
      botMessage,
      hashtags: {items: hashtags},
      id,
    } = await getUserSettings() // We get the user settings for initial display
    const hashtagNames = hashtags.map(({name}) => name)
    // const test = await API.graphql(graphqlOperation(fetchRecentReports,  { hashtag: "testing_hth" }))
    this.setState({
      settings: {settingsId: id, botMessage, hashtags: hashtagNames},
    }) // We need to initialize w/ real settings from DB
  }

  onMessageChange = e => {
    const input = e.target.value
    // Controlling User input for the botMessage input field
    this.setState(prevState => ({
      settings: {...prevState.settings, botMessage: input},
    }))
  }

  onHashtagsChange = e => {
    // Controlling User input for the hashtag input field
    this.setState(prevState => ({
      settings: {...prevState.settings, hashtags: e},
    }))
  }

  onSave = async e => {
    // We CRUD the database when user save changes.
    e.preventDefault()
    await updateUserSettings(this.state.settings)
  }

  render() {
    return (
      <UserStateContext.Provider
        value={{
          state: this.state,
          settings: this.state.settings,
          onMessageChange: this.onMessageChange,
          onHashtagsChange: this.onHashtagsChange,
          onSave: this.onSave,
        }}
      >
        {this.props.children}
      </UserStateContext.Provider>
    )
  }
}

export {UserStateContext, UserProvider}
