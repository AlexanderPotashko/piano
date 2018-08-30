import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './styles.scss'

const cx = classNames.bind(styles)

const Header = ({ logout }) => (
  <header className={cx('header')}>
    <div className={cx('logo')}>Piano</div>
    <button className={cx('logout')} onClick={logout}>
      Logout
    </button>
  </header>
)

Header.propTypes = {
  logout: PropTypes.func
}

export default Header
