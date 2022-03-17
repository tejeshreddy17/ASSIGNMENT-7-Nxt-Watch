import {withRouter, Link} from 'react-router-dom'

import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import {FaMoon} from 'react-icons/fa'

import {FiSun} from 'react-icons/fi'

import ModeContext from '../Context'

import './index.css'

import {
  NavbarSection,
  ImageSection,
  OptionsSection,
  HeaderLogo,
  LogoutButton,
  ProfileImage,
  PopupDescription,
  ButtonContainer,
  ConfirmButton,
  CancelButton,
  ChangeModeButton,
} from './styledComponents'

const Header = props => (
  <ModeContext.Consumer>
    {value => {
      const {darkMode, changeMode, savedVideos} = value

      const onClickingChangeMode = () => {
        changeMode()
      }
      const loggingout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }
      const overlayStyle = {
        backgroundColor: '#40424242',
      }
      return (
        <NavbarSection darkMode={darkMode}>
          <Link to="/">
            <ImageSection>
              <HeaderLogo
                src={
                  darkMode
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt="website logo"
              />
            </ImageSection>
          </Link>

          <OptionsSection>
            <ChangeModeButton
              darkMode={darkMode}
              onClick={onClickingChangeMode}
              data-testid="theme"
            >
              {darkMode ? <FiSun /> : <FaMoon />}
            </ChangeModeButton>
            <ProfileImage
              alt="profile"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
            />
            <Popup
              modal
              nested
              trigger={<LogoutButton darkMode={darkMode}>Logout</LogoutButton>}
              className="popup-content"
              overlayStyle={overlayStyle}
            >
              {close => (
                <>
                  <PopupDescription>
                    Are you sure, you want to logout
                  </PopupDescription>
                  <ButtonContainer>
                    <CancelButton
                      type="button"
                      className="trigger-button"
                      onClick={() => close()}
                    >
                      Cancel
                    </CancelButton>
                    <ConfirmButton type="button" onClick={loggingout}>
                      Confirm
                    </ConfirmButton>
                  </ButtonContainer>
                </>
              )}
            </Popup>
          </OptionsSection>
        </NavbarSection>
      )
    }}
  </ModeContext.Consumer>
)

export default withRouter(Header)
