import { API } from 'aws-amplify'
import { getUserSettings,createUserSettings,updateUserMessage } from '../crud/settings'
import dbSettings from '../testData/dbSettings'


afterEach(() => {
	jest.clearAllMocks()
})


describe('getUserSettings function', () => {
	it('Return no settings if it dont exist', async () => {
		API.graphql.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					listSettings: { items: [] },
				},
			}),
		)
		const settings = await getUserSettings()
		expect(API.graphql).toHaveBeenCalledTimes(1)
		expect(settings).toEqual(undefined)
	})


    it('Return only one user setting', async () => {
        const settingsData = dbSettings.data.listSettings.items[0]
        API.graphql.mockImplementationOnce(() =>
        Promise.resolve({
            data: {
                listSettings: { items: [settingsData,settingsData]  },
            },
        }),
    )
    const settings = await getUserSettings()
    expect(API.graphql).toHaveBeenCalledTimes(1)
    expect(settings).toEqual(settingsData)

    })
    
    
})

describe('createUserSettings function', () => {
	it('Dont create a new setting for user if one exist', async () => {
		const settings = await createUserSettings(dbSettings.data.listSettings.items[0])
		expect(API.graphql).toHaveBeenCalledTimes(0)
        expect(settings).toEqual({
            hashtags: ["mta_hth_test","accident_hth_test","mta_hth"],
            botMessage: "We are looking into this issue",
            settingsId: "749b2b0c-6f78-4592-b427-e222e1e9855c",
        })
    })
    
    it('Creates a new setting for user if one dont exist', async () => {
        const settingsData = dbSettings.data.listSettings.items[0]
        API.graphql.mockImplementationOnce(() =>
        Promise.resolve({
            data: {
                createSetting: settingsData ,
            },
        }),
    )
    		const settings = await createUserSettings(undefined)
		expect(API.graphql).toHaveBeenCalledTimes(1)
        expect(settings).toEqual({
            hashtags: ["mta_hth_test","accident_hth_test","mta_hth"],
            botMessage: "We are looking into this issue",
            settingsId: "749b2b0c-6f78-4592-b427-e222e1e9855c",
        })
	})   
    
})

describe('updateUserMessage function', () => {
	it('Dont update the bot message if there is not settings id provided', async () => {
		const updatedMessage = await updateUserMessage(undefined, "New Message")
        expect(API.graphql).toHaveBeenCalledTimes(0)   
        expect(updatedMessage).toBe(undefined)     
    }) 
    it('Update the bot message if there is not settings id provided', async () => {
		const updatedMessage = await updateUserMessage("749b2b0c-6f78-4592-b427-e222e1e9855c", "New Message")
        expect(API.graphql).toHaveBeenCalledTimes(1) 
        expect(updatedMessage).toBe("New Message")          
    }) 
    it('Update the bot message to empty', async () => {
		const updatedMessage = await updateUserMessage("749b2b0c-6f78-4592-b427-e222e1e9855c", "")
        expect(API.graphql).toHaveBeenCalledTimes(1) 
        expect(updatedMessage).toBe(null)          
    }) 
    
})