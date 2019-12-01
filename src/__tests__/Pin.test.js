/* eslint-disable no-unused-vars */
import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Pin from '../components/Pin/Pin'

const props = {pinClickHandler: jest.fn()}

jest.mock('../__mocks__/@material-ui/icons')
afterEach(cleanup)

describe('Pin Component', () => {
  it('renders a pin', () => {
    const {getByText} = render(<Pin />)
    const icon = getByText('ICON')
  })

  it('renders a pin click', () => {
    const {getByTestId} = render(<Pin {...props} />)
    const pin = getByTestId('pin')
    fireEvent.click(pin)
    expect(props.pinClickHandler).toHaveBeenCalledTimes(1)
  })
})
