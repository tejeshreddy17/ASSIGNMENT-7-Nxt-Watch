import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'

import Header from '../Header'

import HomeVideoItem from '../videoItem'

import SideBarSection from '../SidebarSection'

import ModeContext from '../Context'

import './index.css'

import {
  HomePageBackground,
  BelowHeaderBackground,
  MainSection,
  VideosSection,
  SearchContainer,
  SearchButton,
  SearchInput,
  BannerSection,
  BannerLogo,
  BannerButton,
  CloseButton,
  Bannerheading,
  FailureImage,
  HeadingFailure,
  FailureDescription,
  FailureTryAgain,
} from './styledComponents'

const apiLoadingStatus = {
  initial: 'initial',
  success: 'success',
  loading: 'loading',
  failure: 'failure',
}

class Home extends Component {
  state = {
    videos: [],
    showBanner: true,
    searchInput: '',
    apiStatus: apiLoadingStatus.initial,
  }

  componentDidMount() {
    this.gettingVideos()
  }

  gettingVideos = async () => {
    this.setState({apiStatus: apiLoadingStatus.loading})
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
    if (response.ok === true) {
      this.setState({
        videos: formattedData,
        apiStatus: apiLoadingStatus.success,
      })
    } else {
      this.setState({apiStatus: apiLoadingStatus.failure})
    }
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
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </div>
  )

  renderingFailureView = darkMode => (
    <>
      <FailureImage
        alt="failure view"
        src={
          darkMode
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
      />
      <HeadingFailure darkMode={darkMode}>
        Oops! Something Went Wrong
      </HeadingFailure>
      <FailureDescription>
        We are having some trouble to compare your request. Please Try again.
      </FailureDescription>
      <FailureTryAgain onClick={this.gettingVideos}>Retry</FailureTryAgain>
    </>
  )

  renderingUI = darkMode => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiLoadingStatus.success:
        return this.renderingContent(darkMode)
      case apiLoadingStatus.failure:
        return this.renderingFailureView(darkMode)
      case apiLoadingStatus.loading:
        return this.renderingLoader()
      default:
        return null
    }
  }

  renderingContent = darkMode => {
    const {videos} = this.state

    if (videos.length === 0) {
      return (
        <>
          <FailureImage
            alt="no videos"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          />
          <HeadingFailure darkMode={darkMode}>
            No Search results found
          </HeadingFailure>
          <FailureDescription>
            Try different key words or remove search filter
          </FailureDescription>
          <FailureTryAgain onClick={this.gettingVideos}>Retry</FailureTryAgain>
        </>
      )
    }
    return (
      <VideosSection>
        {videos.map(eachData => (
          <HomeVideoItem
            darkMode={darkMode}
            eachVideo={eachData}
            key={eachData.id}
          />
        ))}
      </VideosSection>
    )
  }

  render() {
    const {match} = this.props

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
                <SideBarSection darkMode={darkMode} match={match} />
                <MainSection data-testid="home" darkMode={darkMode}>
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
                  {this.renderingUI(darkMode)}
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
