import React from 'react'
import Helmet from 'react-helmet'
import {Switch, Route, Redirect} from 'react-router-dom'
import Loadable from 'react-loadable'

import * as metadata from '../metadata'

import Spinner from './presentational/Spinner'
import Protected from './Protected'

const DashboardPage = Loadable({
  loader: () => import(/* webpackChunkName: 'Dashboard' */ './pages/Dashboard'),
  loading: Spinner,
  delay: 300
})

const LoginPage = Loadable({
  loader: () => import(/* webpackChunkName: 'Login' */ './pages/Login'),
  loading: Spinner,
  delay: 300
})

const Routes = () => (
  <div className="app">
    <Helmet
      title={metadata.title}
      meta={metadata.meta}
      link={metadata.link}
      script={metadata.script}
      noscript={metadata.noscript}
    />
    <Switch>
      <Protected path="/dashboard" component={DashboardPage} />
      <Route path="/login" component={LoginPage} />
      <Redirect from="/" to="/dashboard" />
    </Switch>
  </div>
);

export default Routes
