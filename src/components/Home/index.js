import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineSearch, AiFillHome, AiOutlineClose} from 'react-icons/ai'

import {RiMenuAddLine} from 'react-icons/ri'

import {FaFire} from 'react-icons/fa'

import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'

import HomeVideoItem from '../videoItem'

import ModeContext from '../Context'

import './index.css'

import {
  HomePageBackground,
  BelowHeaderBackground,
  SidebarSection,
  MainSection,
  TestCase,
  VideosSection,
  SearchContainer,
  SearchButton,
  SearchInput,
  HomeIcon,
  SideBarHeadings,
  BannerSection,
  BannerLogo,
  BannerButton,
  CloseButton,
  Bannerheading,
  SidebarFooterSection,
  Sidebarlogos,
  SidebarLogosContainer,
  ContactusHeading,
} from './styledComponents'

class Home extends Component {
  state = {videos: [], showBanner: true, searchInput: ''}

  componentDidMount() {
    this.gettingVideos()
  }

  gettingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const formattedData = data.videos.map(eachData => ({
      channel: {
        name: eachData.channel.name,
        profileImageUrl: eachData.channel.profile_image_url,
      },
      id: eachData.id,
      publishedAt: eachData.published_at,
      thumbnailUrl: eachData.thumbnail_url,
      title: eachData.title,
      viewCount: eachData.view_count,
    }))
    console.log(formattedData)
    this.setState({videos: formattedData})
  }

  clickingSearchIcon = () => {
    this.gettingVideos()
  }

  updatingSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  closingBanner = () => {
    this.setState({showBanner: false})
  }

  renderingLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {match} = this.props
    const {videos} = this.state

    const {path} = match

    const {showBanner} = this.state

    return (
      <ModeContext.Consumer>
        {value => {
          const {darkMode} = value
          return (
            <HomePageBackground>
              <Header />
              <BelowHeaderBackground>
                <SidebarSection darkMode={darkMode}>
                  <Link className="side-bar-link-item " to="/">
                    <TestCase darkMode={darkMode} outline={path === '/'}>
                      <HomeIcon outline={path === '/'}>
                        <AiFillHome />
                      </HomeIcon>
                      <SideBarHeadings darkMode={darkMode}>
                        Home
                      </SideBarHeadings>
                    </TestCase>
                  </Link>
                  <Link className="side-bar-link-item " to="/trending">
                    <TestCase outline={path === '/trending'}>
                      <HomeIcon outline={path === '/trending'}>
                        <FaFire />
                      </HomeIcon>
                      <SideBarHeadings darkMode={darkMode}>
                        Trending
                      </SideBarHeadings>
                    </TestCase>
                  </Link>
                  <Link className="side-bar-link-item " to="/gaming">
                    <TestCase outline={path === '/gaming'}>
                      <HomeIcon outline={path === '/gaming'}>
                        <SiYoutubegaming />
                      </HomeIcon>
                      <SideBarHeadings darkMode={darkMode}>
                        Gaming
                      </SideBarHeadings>
                    </TestCase>
                  </Link>
                  <Link className="side-bar-link-item " to="/saved-videos">
                    <TestCase outline={path === '/saved-videos'}>
                      <HomeIcon outline={path === '/gaming'}>
                        <RiMenuAddLine />
                      </HomeIcon>
                      <SideBarHeadings darkMode={darkMode}>
                        Saved Videos
                      </SideBarHeadings>
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
                      Enjoy! Now see to your Channels and Recommendations!{' '}
                    </ContactusHeading>
                  </SidebarFooterSection>
                </SidebarSection>
                <MainSection darkMode={darkMode}>
                  {showBanner && (
                    <BannerSection>
                      <CloseButton
                        data-testid="close"
                        onClick={this.closingBanner}
                      >
                        <AiOutlineClose />
                      </CloseButton>
                      <BannerLogo src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" />
                      <Bannerheading>
                        But Nxt Watch Premium prepaid plans with UPI
                      </Bannerheading>
                      <BannerButton>GET IT NOW</BannerButton>
                    </BannerSection>
                  )}
                  <SearchContainer>
                    <SearchInput
                      onChange={this.updatingSearchInput}
                      placeholder="Search"
                      type="search"
                      darkMode={darkMode}
                    />
                    <SearchButton
                      darkMode={darkMode}
                      onClick={this.clickingSearchIcon}
                    >
                      <AiOutlineSearch />
                    </SearchButton>
                  </SearchContainer>

                  <VideosSection>
                    {videos.map(eachData => (
                      <HomeVideoItem
                        darkMode={darkMode}
                        eachVideo={eachData}
                        key={eachData.id}
                      />
                    ))}
                  </VideosSection>
                </MainSection>
              </BelowHeaderBackground>
            </HomePageBackground>
          )
        }}
      </ModeContext.Consumer>
    )
  }
}

export default Home
