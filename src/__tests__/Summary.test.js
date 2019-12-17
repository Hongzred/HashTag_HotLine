/* eslint-disable no-unused-vars */
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Summary from '../components/Summary/Summary'

afterEach(cleanup)

describe('Summary Component renders sucessfully', () => {
    // const summaryComponent = render(<Summary />);
    it('render Summary', () => {
        const { getByTestId } = render(<Summary />);
        const summary = getByTestId('summary');
        expect(summary).toBeInTheDocument();
    })

    it('render content', () => {
        const { getByText } = render(<Summary />);
        const summary = getByText('Summary');
        expect(summary).toBeInTheDocument();
    })

    it('render correct header', () => {
        const {container} = render(<Summary />);
        const header = container.querySelector('h1');
        expect(header.textContent).toBe('Summary');
    })

    it('render truthy', () => {
        const summaryComponent = render(<Summary />);
        expect(summaryComponent).toBeTruthy();
    })
})