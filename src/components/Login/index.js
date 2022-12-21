import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    inputUserName: '',
    inputPassword: '',
    error: false,
    errorMsg: '',
  }

  onSubmit = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {inputPassword, inputUserName} = this.state
    const userDetails = {username: inputUserName, password: inputPassword}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    this.setState({inputUserName: '', inputPassword: ''})
    if (response.ok) {
      Cookies.set('jwt_token', fetchedData.jwt_token, {expires: 360})
      const {history} = this.props
      history.replace('/')
    } else {
      console.log(fetchedData.error_msg)
      this.setState({error: true, errorMsg: fetchedData.error_msg})
    }
  }

  onChangeUserName = event => {
    this.setState({inputUserName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  render() {
    const {inputUserName, inputPassword, error, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form onSubmit={this.onSubmit} className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <div className="input-con">
            <label htmlFor="username">USERNAME</label>
            <input
              onChange={this.onChangeUserName}
              value={inputUserName}
              placeholder="Username"
              id="username"
            />
          </div>
          <div className="input-con">
            <label htmlFor="password">PASSWORD</label>
            <input
              onChange={this.onChangePassword}
              value={inputPassword}
              placeholder="Password"
              id="password"
              type="password"
            />
          </div>

          <button type="submit">Login</button>
          {error ? <p className="error">{errorMsg}</p> : null}
        </form>
      </div>
    )
  }
}

export default Login
