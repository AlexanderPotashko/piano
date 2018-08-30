import React, {Component} from 'react'
import Helmet from 'react-helmet'
import {Redirect} from 'react-router-dom'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {login} from '../../../store/actions'

import LoginForm from './LoginForm'

import * as metadata from '../../../metadata'

@connect(
  state => ({auth: state.auth, form: state.form}),
  dispatch => ({login: bindActionCreators(login.request, dispatch)})
)
class Login extends Component {
  static propTypes = {
    location: PropTypes.object,
    login: PropTypes.func,
    auth: PropTypes.shape({
      token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    })
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    this.props.login(values)
  }

  render() {
    const isAuthorized = !!this.props.auth.token

    return isAuthorized ? (
      <Redirect
        to={{ pathname: '/dashboard', state: { from: this.props.location } }}
      />
    ) : (
      <div>
        <Helmet
          title={`${metadata.title} - Login`}
          meta={metadata.meta}
          link={metadata.link}
          script={metadata.script}
          noscript={metadata.noscript}
        />
        <LoginForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default withRouter(Login)
