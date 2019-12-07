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
})
