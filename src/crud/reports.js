import { API, graphqlOperation } from 'aws-amplify'
import { listReports } from '../custom_graphql/queries'
import { createReport, createReportHashtags } from '../graphql/mutations'
import { createUserHashtag, getHashtagIdByName } from './hashtags'
import { getUserSettings} from './settings'
import { fetchRecentReports, replyToUser } from '../graphql/queries'
import intersection from '../utils/intersection'

const createUserReport = async ({
	hashtags,
	location,
	post,
	postDate,
	postId,
	userId,
	username,
	userScreenName,
	userProfilePic
}) => {
	const {
		data: {
			createReport: { id: reportId },
		},
	} = await API.graphql(
		graphqlOperation(createReport, {
			input: {
				location,
				post,
				date: postDate,
				postId,
				userId,
				username,
				userScreenName,
				userProfilePic,
				status: 'PENDING',
				spam: false,
			},
		}),
	)
	hashtags.forEach(async hashtag => {
		let hashtagId = await getHashtagIdByName(hashtag)
		if (!hashtagId) {
			await createUserHashtag(hashtag, null)
			hashtagId = await getHashtagIdByName(hashtag)
		}

		await API.graphql(
			graphqlOperation(createReportHashtags, {
				input: {
					reportHashtagsReportId: reportId,
					reportHashtagsHashtagId: hashtagId,
				},
			}),
		)
	})
}

const getUserReports = async () => {
	const {
		data: {
			listReports: { items },
		},
	} = await API.graphql(graphqlOperation(listReports))
	const reports = items.map(report => ({
		...report,
		hashtags: report.hashtags.items.map(({hashtag}) => hashtag.name),
		isDisplayable: true
	}))
	return reports
}

const getRecentUserReports = async (oldReports, hashtags) => {
	const oldReportPostIds = oldReports.filter(({isDisplayable})=> isDisplayable).map(report => report.postId)
	let nonfilteredReports = await hashtags.map(async hashtag => {
		const {
			data: { fetchRecentReports: reports },
		} = await API.graphql(graphqlOperation(fetchRecentReports, { hashtag }))
		return reports
	})
	nonfilteredReports = await Promise.all(nonfilteredReports)

	return nonfilteredReports
		.flat()
		.filter(report => !!report)
		.filter(report => !oldReportPostIds.includes(report.postId))
}

const updateUserReports = async (oldReports, hashtags,sessionHashtags) => {
	const hashtagNames = hashtags.filter(({isSearchable, isInSettings}) => (isSearchable && isInSettings)).map(({name}) => name)
	const reports = await getRecentUserReports(oldReports, [...hashtagNames, ...sessionHashtags])
	let newReports = await reports.map(async (report) => {
		if(intersection(report.hashtags, sessionHashtags).length > 0){
			report.isDisplayable = true
			return report
		}else {
			await createUserReport(report)
			const {botMessage} = await getUserSettings()
			await replyToReport(
				report.userScreenName,
				report.postId,
				botMessage)
			report.isDisplayable = true
			return report
		}
				
	})
	newReports = await Promise.all(reports)

return newReports}

const replyToReport = async ( userScreenName, postId, message) => {
	await API.graphql(graphqlOperation(replyToUser, { userScreenName, tweetId:postId, tweet:message }))
}

export {
	createUserReport,
	getUserReports,
	getRecentUserReports,
	updateUserReports,
	replyToReport
}
