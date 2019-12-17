/* eslint-disable no-unused-vars */
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import GettingStarted from '../components/GettingStarted/GettingStarted'

afterEach(cleanup)

describe('AppDescription Component renders sucessfully', () => {
    it('render AppDescription', () => {
        const { getByTestId } = render(<GettingStarted />);
        const gettingstarted = getByTestId('gettingstarted');
        expect(gettingstarted).toBeInTheDocument();
    })

    it('render menu', () => {
        const { getByText } = render(<GettingStarted />);
        const getStarted = getByText('Getting Started');
        expect(getStarted).toBeInTheDocument();
    })
})