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
