import {withRouter, Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'

import {RiMenuAddLine} from 'react-icons/ri'

import {FaFire} from 'react-icons/fa'

import {SiYoutubegaming} from 'react-icons/si'

import ModeContext from '../Context'

import './index.css'

import {
  SidebarSection,
  TestCase,
  HomeIcon,
  SideBarHeadings,
  SidebarFooterSection,
  Sidebarlogos,
  SidebarLogosContainer,
  ContactusHeading,
} from './styledComponents'

const SideBarSection = props => {
  const {darkMode, match} = props
  const {path} = match

  return (
    <SidebarSection darkMode={darkMode}>
      <Link className="side-bar-link-item " to="/">
        <TestCase darkMode={darkMode} outline={path === '/'}>
          <HomeIcon outline={path === '/'}>
            <AiFillHome />
          </HomeIcon>
          <SideBarHeadings darkMode={darkMode}>Home</SideBarHeadings>
        </TestCase>
      </Link>
      <Link className="side-bar-link-item " to="/trending">
        <TestCase darkMode={darkMode} outline={path === '/trending'}>
          <HomeIcon outline={path === '/trending'}>
            <FaFire />
          </HomeIcon>
          <SideBarHeadings darkMode={darkMode}>Trending</SideBarHeadings>
        </TestCase>
      </Link>
      <Link className="side-bar-link-item " to="/gaming">
        <TestCase darkMode={darkMode} outline={path === '/gaming'}>
          <HomeIcon darkMode={darkMode} outline={path === '/gaming'}>
            <SiYoutubegaming />
          </HomeIcon>
          <SideBarHeadings darkMode={darkMode}>Gaming</SideBarHeadings>
        </TestCase>
      </Link>
      <Link className="side-bar-link-item " to="/saved-videos">
        <TestCase darkMode={darkMode} outline={path === '/saved-videos'}>
          <HomeIcon outline={path === '/saved-videos'}>
            <RiMenuAddLine />
          </HomeIcon>
          <SideBarHeadings darkMode={darkMode}>Saved Videos</SideBarHeadings>
        </TestCase>
      </Link>
      <SidebarFooterSection>
        <ContactusHeading weight="bold" font="18px">
          CONTACT US
        </ContactusHeading>
        <SidebarLogosContainer>
          <Sidebarlogos
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
          <Sidebarlogos
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
          <Sidebarlogos
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </SidebarLogosContainer>
        <ContactusHeading weight="500" font="16px">
          Enjoy! Now to see your channels and recommendations!
        </ContactusHeading>
      </SidebarFooterSection>
    </SidebarSection>
  )
}
export default SideBarSection
