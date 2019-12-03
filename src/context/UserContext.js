/* eslint-disable no-console */
import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
// crud operations
import {
	updateUserSettings,
	getUserSettings,
	createUserSettings,
} from '../crud/settings'

import { listReports } from '../graphql/queries'

import { getUserReports, updateUserReports } from '../crud/reports'

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

	interval = 1800000 // 30 mins

	async componentDidMount() {
		await this.initializeSettings()
		// await this.initializeReports()
		this.pollID = await this.pollTwitter()
		const reportData = await this.getReportData()
		console.log(reportData)
		this.setState({ reports: reportData })
	}

	componentWillUnmount() {
		clearInterval(this.pollID)
	}
	/**
		//    * call listReports query and extract useful information for the use of map component
		//    * @returns reports[]
		//    */

	getReportData = async () => {
		const reportData = await API.graphql(graphqlOperation(listReports))
		console.log(reportData)
		const reports = []

		reportData.data.listReports.items.forEach(data => {
			const report = {
				_id: data.id,
				report: data.username,
				description: data.post,
				latitude: data.latitude,
				longitude: data.longtitude,
			}
			reports.push(report)
		})
		return reports
	}

	pollTwitter = async () => {
		const id = setInterval(async () => {
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
		await createUserSettings()
		const {
			botMessage,
			hashtags: { items: hashtags },
			id,
		} = await getUserSettings()
		const hashtagNames = hashtags.map(({ name }) => name)
		this.setState({
			settings: {
				settingsId: id,
				botMessage,
				hashtags: hashtagNames,
			},
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
