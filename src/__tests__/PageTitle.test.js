/* eslint-disable no-unused-vars */
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PageTitle from '../components/PageTitle/PageTitle'

afterEach(cleanup)

describe('PageTitle Component', () => {
	it('renders PageTitle', () => {
        const {getByTestId} = render(<PageTitle />)
        const title = getByTestId('pageTitle')
        expect(title).toBeInTheDocument()
	})

	it('shows the page title when provided', () => {
		const { getByText } = render(<PageTitle title="Test"/>)
		const title = getByText('Test')
		expect(title).toHaveTextContent('Test')
    })
    
    it('shows no title when nothing is provided', () => {
		const { getByTestId } = render(<PageTitle />)
		const title = getByTestId('pageTitle')
		expect(title.textContent).toBe("")
	})
})
