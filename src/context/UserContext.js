/* eslint-disable no-console */
import React, { Component } from 'react'
// crud operations
import {
	updateUserSettings,
	createUserSettings,
	getUserSettings,
} from '../crud/settings'

import symmetricDifference from '../utils/symmetricDifference'

import {
	updateUserReports,
	getUserReports,
	markAsSpam,
	markAsResolved,
} from '../crud/reports'

const UserStateContext = React.createContext()

/**
 * UserContext Component
 *
 * 	-this is state management component
 * @summary this contains all the state and methods to change the state,
 * @extends Component
 *
 */
class UserProvider extends Component {
	state = {
		settings: {
			botMessage: '',
			resolvedMessage: '',
			hashtags: [],
			settingsId: null,
		},
		reports: [],
		session: [],
	}

	pollID = null

	interval = process.env.REACT_APP_INTERVAL

	async componentDidMount() {
		await this.initializeSettings()
		await this.initializeReports()
		//this.testHandlerByBoardKeys()
		this.pollID = await this.pollTwitter()
	}

	componentWillUnmount() {
		clearInterval(this.pollID)
	}

	// testHandlerByBoardKeys = async () => {
	// 	document.addEventListener('keydown', async event => {
	// 		switch (event.code) {
	// 			case 'KeyQ':
	// 				console.log('This similates disabling mta_hth tag')
	// 				this.onTagDisable('mta_hth')
	// 				console.log(
	// 					'All Settings Hashtags',
	// 					this.state.settings.hashtags.map(({ name }) => name),
	// 				)
	// 				console.log(
	// 					'All  enabled settings Hashtags',
	// 					this.state.settings.hashtags
	// 						.filter(
	// 							({ isSearchable, isInSettings }) =>
	// 								isSearchable && isInSettings,
	// 						)
	// 						.map(({ name }) => name),
	// 				)
	// 				break
	// 			case 'KeyW':
	// 				console.log('This similates enabling mta_hth tag')
	// 				this.onTagEnable('mta_hth')
	// 				console.log(
	// 					'All Settings Hashtags',
	// 					this.state.settings.hashtags.map(({ id, name }) => ({
	// 						id,
	// 						name,
	// 					})),
	// 				)
	// 				console.log(
	// 					'All  enabled settings Hashtags',
	// 					this.state.settings.hashtags
	// 						.filter(
	// 							({ isSearchable, isInSettings }) =>
	// 								isSearchable && isInSettings,
	// 						)
	// 						.map(({ name }) => name),
	// 				)
	// 				break
	// 			case 'KeyE':
	// 				this.onSessionHashtagsChange(['test_hth'])
	// 				console.log('This similates adding session test_hth tag')
	// 				console.log('Session Hashtags', this.state.session)
	// 				break
	// 			case 'KeyR':
	// 				this.onSessionHashtagsChange([])
	// 				console.log('This similates removing session test_hth tag')
	// 				console.log('Session Hashtags', this.state.session)
	// 				break
	// 			case 'KeyT':
	// 				this.onSpamClick('1049f565-3241-4d75-af57-03136d63c391')
	// 				console.log(
	// 					'New Displayable Reports',
	// 					this.state.reports.filter(
	// 						({ spam, isDisplayable }) => !spam && isDisplayable,
	// 					),
	// 				)

	// 				console.log('This similates spam report for T4')
	// 				break
	// 			case 'KeyY':
	// 				this.onResolved('1049f565-3241-4d75-af57-03136d63c391')
	// 				console.log(
	// 					'New Displayable Reports',
	// 					this.state.reports.filter(
	// 						({ status, spam, isDisplayable }) =>
	// 							status !== 'RESOLVED' && !spam && isDisplayable,
	// 					),
	// 				)

	// 				console.log('This similates spam report for T4')
	// 				break
	// 			default:
	// 				break
	// 		}
	// 	})
	// }

	/**
	 * pollTwitter
	 * @method
	 * @summary poll twits from twitter every 5 seconds
	 * @async
	 * @return {string} id - twit
	 */

	pollTwitter = async () => {
		const id = setInterval(async () => {
			const { reports } = this.state
			const settingsHashtags = this.state.settings.hashtags
			const sessionHashtags = this.state.session
			const newReports = await updateUserReports(
				reports,
				settingsHashtags,
				sessionHashtags,
			)
			// const reports = await getUserReports()
			console.log('Current Reports State w/ isDisplayable field', reports)
			console.log(
				'New Reports from Twitter based on displayable hashtags',
				newReports,
			)
			console.log(
				'Displayable Reports',
				reports.filter(({ isDisplayable }) => isDisplayable),
			)
			this.setState({ reports: [...newReports, ...reports] })
		}, this.interval)
		return id
	}

	/**
	 * initializeSettings
	 * @method
	 * @summary pull default settings from database
	 * @async
	 * 
	 * @return {undefined} void
	 */

	initializeSettings = async () => {
		const settings = await createUserSettings(await getUserSettings())
		console.log('Hashtag State', settings)
		this.setState({
			settings,
		})
	}

	/**
	 * initializeReports
	 * @method
	 * @summary pull reports from database when open the app
	 * @async
	 * 
	 * @return {undefined} void
	 */

	initializeReports = async () => {
		const reports = await getUserReports()
		this.setState({
			reports,
		})
	}

	/**
	 * onMessageChange
	 * @method
	 * @summary update botMsg when user makes a change
	 * @async
	 * 
	 * @return {undefined} void
	 */

	onMessageChange = e => {
		const input = e.target.value

		this.setState(prevState => ({
			settings: { ...prevState.settings, botMessage: input },
		}))
	}

	/**
	 * onResolvedMessageChange
	 * @method
	 * @summary update resolvedMsg in the database
	 * @async
	 * 
	 * @return {undefined} void
	 */

	onResolvedMessageChange = e => {
		const input = e.target.value

		this.setState(prevState => ({
			settings: { ...prevState.settings, resolvedMessage: input },
		}))
	}

	/**
	 * onHashtagsChange
	 * @method
	 * @summary update hashtags in the setting
	 * @async
	 * 
	 * @return {undefined} void
	 */

	onHashtagsChange = e => {
		const hashtags = e.map(hashtagName => {
			const name = hashtagName
			const isInSettings = true
			const isSearchable = true
			const id = this.state.settings.settingsId
			return { id, name, isInSettings, isSearchable }
		})

		this.setState(prevState => ({
			settings: { ...prevState.settings, hashtags },
		}))
	}

	/**
	 * onSpamClick
	 * @method
	 * @summary mark a report as spam
	 * @async
	 * 
	 * @return {undefined} void
	 */

	onSpamClick = async reportId => {
		const { reports } = this.state
		await markAsSpam(reportId)
		const updatedReports = reports.map(report => {
			if (report.id === reportId) {
				return { ...report, spam: true }
			}
			return report
		})
		this.setState({
			reports: updatedReports,
		})
	}

	/**
	 * onResolved
	 * @method
	 * @summary mark a report as resolved
	 * @async
	 * 
	 * @return {undefined} void
	 */

	onResolved = async reportId => {
		const { reports } = this.state
		await markAsResolved(reportId)
		const updatedReports = reports.map(report => {
			if (report.id === reportId) {
				return { ...report, status: 'RESOLVED' }
			}
			return report
		})
		this.setState({
			reports: updatedReports,
		})
	}

	/**
	 * onSave
	 * @method
	 * @summary save modified settings and update database
	 * @async
	 * 
	 * @return {undefined} void
	 */

	onSave = async e => {
		e.preventDefault()
		await updateUserSettings(
			this.state.settings,
			this.onTagDelete,
			this.onTagAdd,
		)
	}

	/**
	 * onTagDisable
	 * @method
	 * @summary disable a tag
	 * 
	 * @return {undefined} void
	 */

	onTagDisable = hashtagName => {
		const {
			settings: { hashtags },
			reports,
		} = this.state
		const updatedHashtags = hashtags.map(hashtag => {
			if (hashtag.name === hashtagName) {
				return { ...hashtag, isSearchable: false }
			}
			return hashtag
		})
		const updatedReports = reports.map(report => {
			if (report.hashtags.includes(hashtagName)) {
				return { ...report, isDisplayable: false }
			}
			return report
		})
		this.setState(prevState => ({
			settings: { ...prevState.settings, hashtags: updatedHashtags },
			reports: updatedReports,
		}))
	}

	/**
	 * onTagDelete
	 * @method
	 * @summary delete a tag and update database
	 * 
	 * @return {undefined} void
	 */

	onTagDelete = hashtagName => {
		const { reports } = this.state
		const updatedReports = reports.map(report => {
			if (report.hashtags.includes(hashtagName)) {
				return { ...report, isDisplayable: false }
			}
			return report
		})
		this.setState(prevState => ({
			reports: updatedReports,
		}))
	}

	/**
	 * onTagAdd
	 * @method
	 * @summary add a tag and update database
	 * 
	 * @return {undefined} void
	 */

	onTagAdd = hashtagName => {
		const { reports } = this.state
		const updatedReports = reports.map(report => {
			if (report.hashtags.includes(hashtagName)) {
				return { ...report, isDisplayable: true }
			}
			return report
		})
		this.setState(prevState => ({
			reports: updatedReports,
		}))
	}

	/**
	 * onTagEnable
	 * @method
	 * @summary enable a tag
	 * 
	 * @return {undefined} void
	 */

	onTagEnable = hashtagName => {
		const {
			settings: { hashtags },
			reports,
		} = this.state
		const updatedHashtags = hashtags.map(hashtag => {
			if (hashtag.name === hashtagName) {
				return { ...hashtag, isSearchable: true }
			}
			return hashtag
		})
		const updatedReports = reports.map(report => {
			if (report.hashtags.includes(hashtagName)) {
				return { ...report, isDisplayable: true }
			}
			return report
		})
		this.setState(prevState => ({
			settings: { ...prevState.settings, hashtags: updatedHashtags },
			reports: updatedReports,
		}))
	}

	/**
	 * onSessionHashtagsChange
	 * @method
	 * @summary show results for added hashtag immediately
	 * 
	 * @return {undefined} void
	 */

	onSessionHashtagsChange = e => {
		const { hashtags } = this.state.settings
		const settingsHashtags = hashtags
			.filter(
				({ isSearchable, isInSettings }) =>
					isSearchable && isInSettings,
			)
			.map(({ name }) => name)
		const filteredHashtags = e.filter(
			hashtag => !settingsHashtags.includes(hashtag),
		)
		const arrayDifferences = symmetricDifference(
			filteredHashtags,
			this.state.session,
		) // We get the differences between the user changes & oldHashtags
		arrayDifferences.forEach(hashtag => {
			if (filteredHashtags.includes(hashtag)) {
				this.setState({ session: filteredHashtags })
			} else {
				const updatedReports = this.state.reports.filter(
					report => !report.hashtags.includes(hashtag),
				)
				this.setState({
					session: filteredHashtags,
					reports: updatedReports,
				})
			}
		})
	}

	/**
	 * filterReportByTime
	 * @method
	 * @summary filter reports by hashtag
	 * @async
	 * 
	 * @return {undefined} void
	 */

	filterReportByTime(dayRanges) {
		const dayRange = 1
		const todayDate = new Date()
		const dateNumb = todayDate.getDate()
		const filteredReport = this.state.reports.filter(report => {
			return Math.abs(
				report.postDate.split(' ')[2] - dateNumb <= dayRange,
			)
		})
		this.setState(filteredReport)
	}

	render() {
		return (
			<UserStateContext.Provider
				value={{
					state: this.state,
					settings: this.state.settings,
					reports: this.state.reports.filter(
						({ status, spam, isDisplayable }) =>
							status !== 'RESOLVED' && !spam && isDisplayable,
					),
					onMessageChange: this.onMessageChange,
					onResolvedMessageChange: this.onResolvedMessageChange,
					onHashtagsChange: this.onHashtagsChange,
					onSave: this.onSave,
					// For David
					sessionHashtags: this.state.session,
					onSessionHashtagsChange: this.onSessionHashtagsChange,
					onSpamClick: this.onSpamClick,
					onDayRangeChanged: this.filterReportByTime,
					onResolved: this.onResolved,
					defaultHashtags: this.state.settings.hashtags.map(
						({ id, name, isSearchable }) => ({
							id,
							name,
							isSearchable,
						}),
					), // You can use settings direct if needed as there are more fields
					onHashtagDisable: this.onTagDisable, // You need to pass a hashtag name
					onHashtagEnable: this.onTagEnable, // You need to pass a hashtag name
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
