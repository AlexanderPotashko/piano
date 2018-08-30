import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './styles.scss'

const cx = classNames.bind(styles)

const Button = ({ onClick, className, text }) => (
  <button onClick={onClick} className={cx('button', className)}>
    {text}
  </button>
)

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  text: PropTypes.string
}

export default Button
