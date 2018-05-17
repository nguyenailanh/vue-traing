import {connect} from 'react-redux'
import Footer from '../components/Footer'

const mapState = state => {
  return {
    test: 'test'
  }
}

const mapActions = dispatch => {
  return {
    test: dispatch({ type: 'TEST' })
  }
}

export default connect(
  mapState,
  mapActions
)(Footer)
