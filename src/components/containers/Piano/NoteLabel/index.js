import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './styles.scss'

const cx = classNames.bind(styles)

const NoteLabel = ({keyboardShortcut, isActive, isAccidental}) => (
  <div
    className={cx('label', {
      'active': isActive,
      'accidental': isAccidental,
      'natural': !isAccidental,
    })}
  >
    {keyboardShortcut}
  </div>
)

NoteLabel.propTypes = {
  keyboardShortcut: PropTypes.string,
  isActive: PropTypes.bool,
  isAccidental: PropTypes.bool
}

export default NoteLabel
