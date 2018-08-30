import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'

@connect(state => ({ auth: state.auth }))
class Auth extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    }),
    path: PropTypes.string.isRequired,
    component: PropTypes.func
  }

  render() {
    const {path, component, auth} = this.props
    const isAuthorized = !!auth.token
    const AuthComponent = component

    return (
      <Route
        exec
        path={path}
        render={props =>
          isAuthorized ? (
            <AuthComponent {...props} />
          ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      />
    )
  }
}

export default Auth
