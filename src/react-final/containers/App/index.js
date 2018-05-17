/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import {
  Switch,
  Route,
  BrowserRouter,
  withRouter
} from 'react-router-dom'

import HomePage from 'containers/HomePage/Loadable'
import Article from '../ArticlePage/ArticlePage'
import EditPost from '../ArticlePage/EditPost'
import Setting from '../AuthenPages/Setting'
import Login from '../AuthenPages/Login'
import Signup from '../AuthenPages/Signup'
import ProfilePage from '../ProfilePage'
import Header from '../Header'
import Footer from '../Footer'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import SimpleLoadingBar from 'react-simple-loading-bar'
import {connect} from 'react-redux'
import NotificationSystem from 'react-notification-system'

import {
  createStructuredSelector
} from 'reselect';

import {
  makeSelectAppLoading,
  makeSelectAppError
} from './selectors';

export class App extends React.Component {
  componentDidUpdate () {
    const { error } = this.props
    if(error !== '') {
      this.refs.notifiSystem.addNotification({
        title: 'Error',
        message: error,
        position: 'tc',
        level: 'error'
      });
    } 
  }

  render () {
    return (
      <div>
        <NotificationSystem ref="notifiSystem" />
        <SimpleLoadingBar
          activeRequests={this.props.loading}
          color={'#5CB85C'}
        >
        </SimpleLoadingBar>
        <Header
          doLogout={this.props.doLogout}
        />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/setting" component={Setting} />
          <Route path="/article/:slug" component={Article} />
          <Route path="/editpost/:slug" component={EditPost} />
          <Route path="/newpost" component={EditPost} />
          <Route path="/@:username" component={ProfilePage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapState = createStructuredSelector({
  loading: makeSelectAppLoading(),
  error: makeSelectAppError()
});

function mapActions(dispatch) {
  return {
    doLogout: () => {
      dispatch({
        type: 'LOGOUT_REQUEST'
      })
    }
  }
}

export default withRouter(connect(
  mapState,
  mapActions
)(App));
