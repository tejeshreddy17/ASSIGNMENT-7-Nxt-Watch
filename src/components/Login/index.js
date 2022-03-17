import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import {
  LoginAppBackground,
  LoginForm,
  Logo,
  Input,
  LoginButton,
  LabelButton,
  CheckboxContainer,
  ErrorMsg,
  CheckboxInput,
} from './styledComponents'

class Login extends Component {
  state = {username: '', password: '', showPassword: false, showErrorMsg: false}

  submittingForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessfulLogin(data.jwt_token)
    } else {
      this.setState({showErrorMsg: true, errMsg: data.error_msg})
    }
  }

  onSuccessfulLogin = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 2})
    history.replace('/')
  }

  updatingUsername = event => {
    this.setState({username: event.target.value, showErrorMsg: false})
  }

  updatingPassword = event => {
    this.setState({password: event.target.value, showErrorMsg: false})
  }

  updatingCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {showPassword, showErrorMsg, errMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <LoginAppBackground>
        <LoginForm onSubmit={this.submittingForm}>
          <Logo
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          />
          <LabelButton marginTop="10px" htmlFor="username">
            USERNAME
          </LabelButton>
          <Input
            value={username}
            height="40px"
            placeholder="Username"
            type="text"
            id="username"
            width="100%"
            onChange={this.updatingUsername}
          />
          <LabelButton marginTop="10px" htmlFor="password">
            PASSWORD
          </LabelButton>
          <Input
            value={password}
            height="40px"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            width="100%"
            onChange={this.updatingPassword}
          />

          <CheckboxContainer>
            <CheckboxInput
              onChange={this.updatingCheckbox}
              marginRight="8px"
              type="checkbox"
              id="showpassword"
            />
            <LabelButton color="black" marginTop="0px" htmlFor="showpassword">
              Show Password
            </LabelButton>
          </CheckboxContainer>
          <LoginButton type="submit">Login</LoginButton>
          {showErrorMsg && <ErrorMsg>*{errMsg}</ErrorMsg>}
        </LoginForm>
      </LoginAppBackground>
    )
  }
}

export default Login
