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
				"isDisplayable": true,
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

	it('Fetches all reports formated', async () => {
		API.graphql.mockImplementationOnce(() => Promise.resolve(dbReports))
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
			{
				date: 'Wed Dec 04 14:31:58 +0000 2019',
				hashtags: ['accident_hth_test'],
				id: 'e227c0a4-8bf1-4c91-8438-b51518ad886b',
				"isDisplayable": true,
				location: {
					latitude: 40.74195143555109,
					longitude: -73.98936868406889,
				},
				post: '#accident_hth_test Tree fall..',
				postId: '1202234090461810691',
				spam: false,
				status: 'PENDING',
				userId: '1187559230414434304',
				username: 'HashTagHotline',
			},
		])
	})
})

describe('getRecentUserReports function', () => {
    it('Return all twitter reports when no oldReports exist', async () => {
        API.graphql.mockImplementationOnce(() =>
        Promise.resolve(twitterReports),
    )
        const oldReports = []
		const report = await getRecentUserReports(oldReports, ['accident_hth_test'])
		expect(API.graphql).toHaveBeenCalledTimes(1)
		expect(report).toEqual(twitterReports.data.fetchRecentReports)
    })
	it('Fetch a no new twitter reports when no hashtags are provided', async () => {

        const oldReports = [{
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
        }]
		const report = await getRecentUserReports(oldReports, [])
		expect(API.graphql).toHaveBeenCalledTimes(0)
		expect(report).toEqual([])
    })

    it('Return a only new twitter reports when there are some oldReports & hashtags ', async () => {
        API.graphql.mockImplementationOnce(() =>
        Promise.resolve(twitterReports),
    )
        const oldReports = [{
			
				"hashtags": [
				  "accident_hth_test",
				],
				"location":  {
		         "latitude": 40.656079999999996,
		         "longitude": -73.915304,
		       },
		       "post": "#accident_hth_test Bus accident.",
		       "postDate": "Wed Dec 04 14:12:00 +0000 2019",
		       "postId": "1202229065081610242",
		       "userId": "1187559230414434304",
		       "username": "HashTagHotline",
		     },
		     {
		       "hashtags":[
		         "accident_hth_test",
		       ],
		       "location":  {
				  "latitude": 40.74195143555109,
				  "longitude": -73.98936868406889,
				},
				"post": "#accident_hth_test Tree fall..",
				"postDate": "Wed Dec 04 14:31:58 +0000 2019",
            id: '1e5de4aa-ab71-4a99-81bc-08f58ef3586f',
            postId: '1202229065081610242',
            spam: false,
            status: 'PENDING',
            userId: '1187559230414434304',
            username: 'HashTagHotline',
        }]
		const report = await getRecentUserReports(oldReports,['accident_hth_test'])
		expect(API.graphql).toHaveBeenCalledTimes(1)
		expect(report).toEqual([twitterReports.data.fetchRecentReports[1]])
    })
    
    
})