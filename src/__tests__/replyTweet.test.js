import replyTweet from '../utils/replyTweet'

const Twit = require('twit')

describe('Reply to tweet', () => {
	it('doesnt reply to tweet when receiving no screen name', async () => {
		const isSuccessful = await replyTweet(
			undefined,
			'Response test2',
			'1195487067985371136',
		)
		expect(isSuccessful).toBe(false)
		expect(Twit.prototype.post).toHaveBeenCalledTimes(0)
	})

	it('doesnt reply to tweet when receiving no tweet id', async () => {
		const isSuccessful = await replyTweet('TagHotline', 'Response test2')
		expect(isSuccessful).toBe(false)
		expect(Twit.prototype.post).toHaveBeenCalledTimes(0)
	})

	it('replies to tweet with given screen name & tweet id', async () => {
		const isSuccessful = await replyTweet(
			'TagHotline',
			'Response test2',
			'1195487067985371136',
		)
		expect(isSuccessful).toBe(true)
		expect(Twit.prototype.post).toHaveBeenCalledTimes(1)
		expect(Twit.prototype.post).toHaveBeenCalledWith('statuses/update', {
			in_reply_to_status_id: '1195487067985371136',
			status: '@TagHotline Response test2',
		})
	})
})
