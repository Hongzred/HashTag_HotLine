import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {
	render,
	cleanup,
	fireEvent,
	waitForDomChange,
} from '@testing-library/react'
import axios from 'axios'
// import reverseGeocode from "./reverseGeocode";
import MapPopup from '../components/MapPopup/MapPopup'

jest.mock('../__mocks__/react-map-gl')

const props = {
	latitude: 40.73061,
	longitude: -73.935242,
	description: 'description1',
	popupCloseHandler: jest.fn(),
}

afterEach(cleanup)

describe('MapPopup Component', () => {
	it('renders loading popup', () => {
		const { getByTestId } = render(<MapPopup {...props} />)

		const popup = getByTestId('popup')
		const location = getByTestId('location_popup')
		const report = getByTestId('report_popup')

		expect(popup).toBeInTheDocument()
		expect(location).toHaveTextContent('Loading...')
		expect(report).toHaveTextContent(props.description)
		expect(props.popupCloseHandler).toHaveBeenCalledTimes(0)
	})

	it('closes popup on user close event.', () => {
		const { getByTestId } = render(<MapPopup {...props} />)
		const popup = getByTestId('popup')
		const closeButton = getByTestId('close_map_popup')
		expect(popup).toBeInTheDocument()
		fireEvent.click(closeButton)
		expect(popup).not.toBeInTheDocument()
		expect(props.popupCloseHandler).toHaveBeenCalledTimes(1)
	})

	it('renders a finished loaded popup w/ address.', async () => {
		axios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					features: [
						{
							place_name: 'New York City',
						},
					],
				},
			}),
		)

		const { getByTestId } = render(<MapPopup {...props} />)

		const domChanges = await waitForDomChange(() => {
			getByTestId('location_popup')
		})
		const report = getByTestId('report_popup')
		expect(report).toHaveTextContent(props.description)
		expect(domChanges.length).toBe(1)
		expect(domChanges[0].oldValue).toEqual('Loading...')
		expect(getByTestId('location_popup')).toHaveTextContent('New York City')
	})
})
