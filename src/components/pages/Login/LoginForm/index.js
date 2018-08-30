/*
 * LOGIN FORM WITH ANIMATED SVG
 * https://codepen.io/dsenneff/pen/2c3e5bc86b372d5424b00edaf4990173
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {reduxForm, Field} from 'redux-form'
import classNames from 'classnames/bind'

import LoginSvgIcon from '../../../presentational/LoginSvgIcon'
import TweenMax from '../../../../utils/TweenMax'

import scss from './styles.scss'
const styles = classNames.bind(scss)

class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func
  }

  componentDidMount() {
    if (process.browser) {
      TweenMax(scss)
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit} className={styles('form')}>
        <div className={styles('svgContainer')}>
          <div>
            <LoginSvgIcon />
          </div>
        </div>
        <div className={styles('inputGroup', 'inputGroup1')}>
          <label
            className={styles('label')}
            htmlFor="loginEmail"
            id="loginEmailLabel"
          >
            Email
          </label>
          <Field
            name="email"
            component="input"
            className={styles('input')}
            type="email"
            id="loginEmail"
            maxLength="254"
          />
          <p className={styles('helper', 'helper1')}>email@domain.com</p>
        </div>
        <div className={styles('inputGroup', 'inputGroup2')}>
          <label
            className={styles('label')}
            htmlFor="loginPassword"
            id="loginPasswordLabel"
          >
            Password
          </label>
          <Field
            name="password"
            component="input"
            className={styles('input', 'inputPassword')}
            type="password"
            id="loginPassword"
          />
          <label
            className={styles('label', 'showPasswordToggle')}
            id="showPasswordToggle"
            htmlFor="showPasswordCheck"
          >
            Show
            <input
              className={styles('inputCheckbox')}
              id="showPasswordCheck"
              type="checkbox"
            />
            <div className={styles('indicator')} />
          </label>
        </div>
        <div className={styles('inputGroup', 'inputGroup3')}>
          <button type="submit" className={styles('button')} id="login">
            Log in
          </button>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: 'login' })(LoginForm);
