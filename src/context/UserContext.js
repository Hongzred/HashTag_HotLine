import React, { Component } from 'react'
// crud operations
import { updateUserSettings, createUserSettings } from '../crud/settings'

import { updateUserReports, getUserReports } from '../crud/reports'

const UserStateContext = React.createContext()

class UserProvider extends Component {
	state = {
		settings: {
			botMessage: '',
			hashtags: [],
			settingsId: null,
		},
		reports: [],
	}

	pollID = null

	interval = process.env.REACT_APP_INTERVAL

	async componentDidMount() {
		await this.initializeSettings()
		await this.initializeReports()
		this.pollID = await this.pollTwitter()
	}

	componentWillUnmount() {
		clearInterval(this.pollID)
	}

	pollTwitter = async () => {
		const id = setInterval(async () => {
			// const dbReports = await getUserReports()
			const newReports = await updateUserReports(
				this.state.reports,
				this.state.settings.hashtags,
			)
			const reports = await getUserReports()
			console.log('Current Reports', this.state.reports)
			console.log('New Reports', newReports)
			this.setState({ reports })
		}, this.interval)
		return id
	}

	initializeSettings = async () => {
		const settings = await createUserSettings()
		this.setState({
			settings,
		})
	}

	initializeReports = async () => {
		const reports = await getUserReports()
		this.setState({
			reports,
		})
	}

	onMessageChange = e => {
		const input = e.target.value

		this.setState(prevState => ({
			settings: { ...prevState.settings, botMessage: input },
		}))
	}

	onHashtagsChange = e => {
		this.setState(prevState => ({
			settings: { ...prevState.settings, hashtags: e },
		}))
	}

	onSave = async e => {
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

const useUserState = () => {
	const context = React.useContext(UserStateContext)
	if (context === undefined) {
		throw new Error('useLayoutState must be used within a LayoutProvider')
	}
	return context
}

export { UserStateContext, UserProvider, useUserState }
