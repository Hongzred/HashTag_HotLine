import { API } from 'aws-amplify'
import { updateUserHashtag,
	getHashtagIdByName,
    getUserHashtags,
	createUserHashtag} from '../crud/hashtags'
import dbHashtags from '../testData/dbHashtags'


afterEach(() => {
	jest.clearAllMocks()
})



describe('createUserHashtag function', () => {
	it('Dont create hashtag if there is no hashName provided', async () => {
		const hashtag = await createUserHashtag(undefined, "749b2b0c-6f78-4592-b427-e222e1e9855c")
        expect(API.graphql).toHaveBeenCalledTimes(0)   
        expect(hashtag).toBe(undefined)     
    }) 
    it('Create hashtag if there is hashtagName', async () => {
		const hashtag = await createUserHashtag("name", "749b2b0c-6f78-4592-b427-e222e1e9855c")
        expect(API.graphql).toHaveBeenCalledTimes(1) 
        expect(hashtag).toBe("name")          
    }) 
    it('Create hashtag given an name & no settingsId', async () => {
		const hashtag = await createUserHashtag("name")
        expect(API.graphql).toHaveBeenCalledTimes(1) 
        expect(hashtag).toBe("name")         
    })
    
})

describe('getHashtag function', () => {
	it('Return no hashtags if none are created', async () => {
		API.graphql.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					listHashtags: { items: [] },
				},
			}),
		)
		const hashtags = await getUserHashtags()
		expect(API.graphql).toHaveBeenCalledTimes(1)
		expect(hashtags).toEqual([])
    })
    
    it('Returns created hashtags formatted', async () => {
        const hashtagsData = dbHashtags.data.listHashtags.items
		API.graphql.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					listHashtags: { items: hashtagsData },
				},
			}),
		)
		const hashtags = await getUserHashtags()
		expect(API.graphql).toHaveBeenCalledTimes(1)
		expect(hashtags).toEqual([{  
            "id": "cb6302da-d528-491f-852c-6e082f528e9b",
            "hashtag": "mta_hth_test",
            isInSettings: false,
        },{
            "id": "8b673219-9e47-44f0-9e6b-9d857096785a",
            "hashtag": "accident_hth_test",
            isInSettings: true
        }, {
            "id": "4170a407-7a03-4029-899d-f40d948e3905",
            "hashtag": "mta_hth",
            "isInSettings": true
        }])
	})
})
