import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {showSubmitError: false, username: '', password: '', errMsg: ''}

  onSubmitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showSubmitError: true, errMsg})
  }

  checkUser = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const detailsObj = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(detailsObj),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showSubmitError, username, password, errMsg} = this.state
    return (
      <div className="login-bg-container d-flex flex-row justify-content-center align-items-center">
        <form className="login-card-container">
          <div className="d-flex flex-row justify-content-center">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <label htmlFor="USERNAME" className="text-light mt-5">
            USERNAME
          </label>
          <input
            id="USERNAME"
            type="text"
            onChange={this.onChangeName}
            value={username}
            placeholder="Username"
            className="input-element form-control"
          />
          <label htmlFor="PASSWORD" className="text-light mt-3">
            PASSWORD
          </label>
          <input
            onChange={this.onChangePassword}
            id="PASSWORD"
            value={password}
            type="password"
            placeholder="Password"
            className="input-element form-control"
          />
          {showSubmitError && <p style={{color: 'red'}}>*{errMsg}</p>}
          <div className="d-flex flex-row justify-content-center mt-4">
            <button
              onClick={this.checkUser}
              type="submit"
              className="btn login-btn "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
