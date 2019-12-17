/* eslint-disable no-unused-vars */
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AppDescription from '../components/AppDescription/AppDescription'

afterEach(cleanup)

describe('AppDescription Component renders sucessfully', () => {
    it('render AppDescription', () => {
        const { getByTestId } = render(<AppDescription />);
        const appdescription = getByTestId('appdescription');
        expect(appdescription).toBeInTheDocument();
    })

    it('render content', () => {
        const { getByText } = render(<AppDescription />);
        const summary = getByText('Summary');
        const getStarted = getByText('Getting Started');
        expect(summary).toBeInTheDocument();
        expect(getStarted).toBeInTheDocument();
    })
})