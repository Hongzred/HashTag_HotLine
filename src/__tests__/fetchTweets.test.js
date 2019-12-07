import fetchTweets from '../utils/fetchTweets'
import fakeTweets from '../testData/fakeTweets'

const Twit = require('twit')

afterEach(() => {
	jest.clearAllMocks()
})

const expectedData = [
	{
		postDate: 'Fri Nov 15 23:41:42 +0000 2019',
		postId: '1195487067985371136',
		post: '#testing_hth testing 2',
		hashtags: ['testing_hth'],
		userId: '1187559230414434304',
		username: 'HashTagHotline',
		location: {
			longitude: -73.93049282607896,
			latitude: 40.65323183619257,
		},
	},
	{
		postDate: 'Fri Nov 15 22:50:28 +0000 2019',
		postId: '1195474173390446592',
		post: '#testing_hth this is a test',
		hashtags: ['testing_hth'],
		userId: '1187559230414434304',
		username: 'HashTagHotline',
		location: {
			longitude: -74.041878,
			latitude: 40.570842,
		},
	},
]

describe('Fetch twitters by hashtag', () => {
	it('fetches nothing from twitter when receiving no hashtag', async () => {
		const jsonData = await fetchTweets()
		expect(jsonData.length).toBe(0)
		expect(Twit.prototype.get).toHaveBeenCalledTimes(0)
	})

	it('Return no tweets if fetch request fails', async () => {
		Twit.prototype.get.mockImplementationOnce(() =>
		Promise.resolve({
			data: {error:"Error"}
		}),
	)
		const jsonData = await fetchTweets('testing_hth')
		expect(Twit.prototype.get).toHaveBeenCalledTimes(1)
		expect(jsonData).toEqual([])
	})

	it('Returns nothing if a tweet dont have a location', async () => {
		const tweet = {...fakeTweets.statuses[1]}
		tweet.place = null

		Twit.prototype.get.mockImplementationOnce(() =>
		Promise.resolve({
			data: { statuses: [tweet] },
		}),
	)
		const jsonData = await fetchTweets('testing_hth')
		expect(Twit.prototype.get).toHaveBeenCalledTimes(1)
		expect(jsonData).toEqual([null])
	})

	it('fetches a tweet from twitter by hashtag', async () => {
		Twit.prototype.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: { statuses: [fakeTweets.statuses[0]] },
			}),
		)

		const jsonData = await fetchTweets('testing_hth')
		expect(jsonData.length).toBe(1)
		expect(Object.keys(jsonData[0]).length).toBe(7)
		expect(jsonData[0]).toMatchObject(expectedData[0])
		expect(Twit.prototype.get).toHaveBeenCalledTimes(1)
		expect(Twit.prototype.get).toHaveBeenCalledWith('search/tweets', {
			q: '#testing_hth',
			result_type: 'recent',
			count:100
		})
	})

	it('fetches multiple tweets from twitter by hashtag', async () => {
		Twit.prototype.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: {...fakeTweets} ,
			}),
		)
		const jsonData = await fetchTweets('testing_hth')

		expect(jsonData.length).toBe(2)
		expect(jsonData).toMatchObject(expectedData)
		expect(Twit.prototype.get).toHaveBeenCalledTimes(1)
		expect(Twit.prototype.get).toHaveBeenCalledWith('search/tweets', {
			q: '#testing_hth',
			result_type: 'recent',
			count:100
		})
	})
})
