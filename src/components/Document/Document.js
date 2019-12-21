import React from 'react'
import PropTypes from 'prop-types'

/**
 * Some documented component
 * 
 * @component
 * @example
 * const size = 12
 * const text = 'I am documented!'
 * return (
 *   <Documented size={size} text={text} />
 * )
 */
const Documented = (props) => {
  const { text, size } = props
  return (
    <p style={{ fontSize: size, padding: 10, border: '1px solid #ccc'}}>{text}</p>
  )
}

Documented.propTypes = {
  /**
   * Text is a text :)
   */
  text: PropTypes.string.isRequired,
  /**
   * Font size
   */
  size: PropTypes.number,
}

Documented.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  text: 'Hello World',
  size: 12,
}

export default Documented