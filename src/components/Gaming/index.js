import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'

import {RiMenuAddLine} from 'react-icons/ri'

import {FaFire} from 'react-icons/fa'

import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'

import './index.css'

import {
  HomePageBackground,
  BelowHeaderBackground,
  SidebarSection,
  MainSection,
  TestCase,
  HomeIcon,
  SideBarHeadings,
} from '../Home/styledComponents'

class Gaming extends Component {
  render() {
    const {match} = this.props

    const {path} = match
    return (
      <HomePageBackground>
        <Header />
        <BelowHeaderBackground>
          <SidebarSection>
            <Link className="side-bar-link-item " to="/">
              <TestCase outline={path === '/'}>
                <HomeIcon outline={path === '/'}>
                  <AiFillHome />
                </HomeIcon>
                <SideBarHeadings>Home</SideBarHeadings>
              </TestCase>
            </Link>
            <Link className="side-bar-link-item " to="/trending">
              <TestCase outline={path === '/trending'}>
                <HomeIcon outline={path === '/trending'}>
                  <FaFire />
                </HomeIcon>
                <SideBarHeadings>Trending</SideBarHeadings>
              </TestCase>
            </Link>
            <Link className="side-bar-link-item " to="/gaming">
              <TestCase outline={path === '/gaming'}>
                <HomeIcon outline={path === '/gaming'}>
                  <SiYoutubegaming />
                </HomeIcon>
                <SideBarHeadings>Gaming</SideBarHeadings>
              </TestCase>
            </Link>
            <Link className="side-bar-link-item " to="/saved-videos">
              <TestCase outline={path === '/saved-videos'}>
                <HomeIcon outline={path === '/saved-videos'}>
                  <RiMenuAddLine />
                </HomeIcon>
                <SideBarHeadings>Saved Videos</SideBarHeadings>
              </TestCase>
            </Link>
          </SidebarSection>
          <MainSection>
            <h1>Gaming Section</h1>
          </MainSection>
        </BelowHeaderBackground>
      </HomePageBackground>
    )
  }
}

export default Gaming
