import {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

function LoginPage(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  function onChangeUsername(event) {
    setUsername(event.target.value)
  }

  function onChangePassword(event) {
    setPassword(event.target.value)
  }

  function onLoginSuccessful(jwtToken) {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  function onLoginFailure(error) {
    setLoginStatus(false)
    setErrorMsg(error)
  }

  async function fetchingUserdata(options, url) {
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onLoginSuccessful(data.jwt_token)
    } else {
      onLoginFailure(data.error_msg)
    }
  }

  function onClickSubmit(event) {
    event.preventDefault()
    const userDetails = {username, password}
    const Url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    fetchingUserdata(options, Url)
  }

  function onClickShowPassword() {
    setShowPassword(prevState => !prevState)
  }

  return (
    <div className="login-main-container">
      <div className="login-sub-container">
        <img
          className="logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        />
        <form onSubmit={onClickSubmit}>
          <div className="input-fields">
            <label className="login-label" htmlFor="username">
              Username
            </label>
            <input
              className="login-input"
              value={username}
              type="text"
              id="username"
              onChange={onChangeUsername}
            />
          </div>
          <div className="input-fields">
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <input
              className="login-input"
              value={password}
              type={showPassword ? 'text' : 'password'}
              id="password"
              onChange={onChangePassword}
            />
          </div>
          <div className="show-password-container">
            <input
              onChange={onClickShowPassword}
              type="checkbox"
              id="checkbox"
            />
            <label htmlFor="checkbox">Show password</label>
          </div>
          <div className="button-container">
            <button className="submit-button" type="submit">
              Login
            </button>
            {!loginStatus && <p className="error-msg">{errorMsg}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
