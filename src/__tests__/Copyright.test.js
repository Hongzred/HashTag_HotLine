/* eslint-disable no-unused-vars */
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Copyright from '../components/Copyright/Copyright'

afterEach(cleanup)

describe('Copyright Component', () => {
	it('renders Copyright', () => {
        const {getByTestId} = render(<Copyright />)
        const copyright = getByTestId('copyright')
        expect(copyright).toBeInTheDocument()
	})

	it('shows the company name', () => {
		const { getByText } = render(<Copyright />)
		const element = getByText('Hashtag Hotline')
		expect(element).toBeInTheDocument()
    })
    
    it('shows the current year', () => {
		const { getByText } = render(<Copyright />)
		const currentYear = getByText(`${new Date().getFullYear()}`)
		expect(currentYear).toBeInTheDocument()
	})
})
