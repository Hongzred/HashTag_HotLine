import { API } from 'aws-amplify'
import { getUserReports, getRecentUserReports } from '../crud/reports'
import {dbReports, twitterReports} from '../testData/dbReports'


afterEach(() => {
	jest.clearAllMocks()
})

describe('getUserReports function', () => {
	it('Fetch a no reports', async () => {
		API.graphql.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					listReports: { items: [] },
				},
			}),
		)
		const report = await getUserReports()

		expect(API.graphql).toHaveBeenCalledTimes(1)
		expect(report).toEqual([])
	})

	it('Fetches a formated report', async () => {
		API.graphql.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					listReports: {
						items: [dbReports.data.listReports.items[0]],
					},
				},
			}),
		)
		const report = await getUserReports()

		expect(API.graphql).toHaveBeenCalledTimes(1)
		expect(report).toEqual([
			{
				date: 'Wed Dec 04 14:12:00 +0000 2019',
				hashtags: ['accident_hth_test'],
				id: '1e5de4aa-ab71-4a99-81bc-08f58ef3586f',
				location: {
					latitude: 40.656079999999996,
					longitude: -73.915304,
				},
				post: '#accident_hth_test Bus accident.',
				postId: '1202229065081610242',
				spam: false,
				status: 'PENDING',
				userId: '1187559230414434304',
				username: 'HashTagHotline',
			},
		])
	})

})
