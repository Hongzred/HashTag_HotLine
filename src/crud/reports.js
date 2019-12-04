import { API, graphqlOperation } from 'aws-amplify'
import { listReports } from '../custom_graphql/queries'
import { createReport, createReportHashtags } from '../graphql/mutations'
import { createUserHashtag, getHashtagByName } from './settings'
import { fetchRecentReports } from '../graphql/queries'

const createUserReport = async ({
	hashtags,
	location,
	post,
	postDate,
	postId,
	userId,
	username,
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
				status: 'PENDING',
				spam: false,
			},
		}),
	)
	hashtags.forEach(async hashtag => {
		let hashtagId = await getHashtagByName(hashtag)
		if (!hashtagId) {
			await createUserHashtag(hashtag, null)
			hashtagId = await getHashtagByName(hashtag)
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
		hashtags: report.hashtags.items.map(hashtag => hashtag.name),
	}))
	return reports
}

const getRecentUserReports = async (oldReports, hashtags) => {
	const oldReportPosts = oldReports.map(report => report.postId)
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
		.filter(report => !oldReportPosts.includes(report.postId))
}

const updateUserReports = async (oldReports, hashtags) => {
	const reports = await getRecentUserReports(oldReports, hashtags)
	await reports.forEach(async report => {
		await createUserReport(report)
	})
	return reports
}

export {
	createUserReport,
	getUserReports,
	getRecentUserReports,
	updateUserReports,
}
