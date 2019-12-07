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

})
