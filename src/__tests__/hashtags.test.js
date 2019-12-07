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

