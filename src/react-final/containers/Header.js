import {connect} from 'react-redux'
import Header from '../components/Header'
import { createStructuredSelector } from 'reselect'
import { makeSelectCurrentUser } from 'containers/App/selectors'


const mapState = createStructuredSelector({
  loggedUser: makeSelectCurrentUser()
});


const mapActions = dispatch => {
  return {
    test: dispatch({ type: 'TEST' })
  }
}

export default connect(
  mapState,
  mapActions
)(Header)
