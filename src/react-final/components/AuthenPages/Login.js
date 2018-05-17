import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {  // eslint-disable-line react/prefer-stateless-function
  constructor () {
    super()
    this.state = {
      email: '',
      password: ''
    }

    this.updateState = this.updateState.bind(this)
  }

  updateState (evt) {
    this.setState({
      [evt.target.name]:  evt.target.value
    })
  }

  componentDidUpdate () {
    const { loggedUser, history } = this.props

    if (loggedUser && loggedUser.username) {
      history.replace('/')
    }
  }

  render() {
    const {
      loading,
      onSubmitHandler
    } = this.props

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Login</h1>
              <p className="text-xs-center">
                <Link to="/signup">Have not an account?</Link>
              </p>
              <form onSubmit={onSubmitHandler(this.state)}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    onChange={this.updateState}
                    name="email"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    onChange={this.updateState}
                    name="password"
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  disabled={loading}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
 }

export default Login;
