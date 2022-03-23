import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'

import GamingVideoItem from '../GamingVideoItem'

import SideBarSection from '../SidebarSection'

import ModeContext from '../Context'

import './index.css'

import {
  HomePageBackground,
  BelowHeaderBackground,
  MainSection,
  VideosSection,
  FailureImage,
  HeadingFailure,
  FailureDescription,
  FailureTryAgain,
  TrendingHeadingContainer,
  TrendingLogo,
  TrendingsectionHeading,
  FailureContainer,
} from './styledComponents'

const apiLoadingStatus = {
  initial: 'initial',
  success: 'success',
  loading: 'loading',
  failure: 'failure',
}

class Gaming extends Component {
  state = {
    videos: [],
    apiStatus: apiLoadingStatus.initial,
  }

  componentDidMount() {
    this.gettingVideos()
  }

  gettingVideos = async () => {
    this.setState({apiStatus: apiLoadingStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const formattedData = data.videos.map(eachData => ({
      id: eachData.id,
      thumbnailUrl: eachData.thumbnail_url,
      title: eachData.title,
      viewCount: eachData.view_count,
    }))
    console.log(formattedData)
    if (response.ok === true) {
      this.setState({
        videos: formattedData,
        apiStatus: apiLoadingStatus.success,
      })
    } else {
      this.setState({apiStatus: apiLoadingStatus.failure})
    }
  }

  renderingLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </div>
  )

  renderingFailureView = darkMode => (
    <FailureContainer>
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
        We are having some trouble to compare your request. Please Try again
      </FailureDescription>
      <FailureTryAgain onClick={this.gettingVideos}>Retry</FailureTryAgain>
    </FailureContainer>
  )

  renderingContent = darkMode => {
    const {videos} = this.state

    return (
      <>
        <TrendingHeadingContainer darkMode={darkMode}>
          <TrendingLogo darkMode={darkMode}>
            <SiYoutubegaming />
          </TrendingLogo>
          <TrendingsectionHeading darkMode={darkMode}>
            Gaming
          </TrendingsectionHeading>
        </TrendingHeadingContainer>

        <VideosSection>
          {videos.map(eachData => (
            <GamingVideoItem
              darkMode={darkMode}
              eachVideo={eachData}
              key={eachData.id}
            />
          ))}
        </VideosSection>
      </>
    )
  }

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

  render() {
    const {match} = this.props

    const {path} = match
    return (
      <ModeContext.Consumer>
        {value => {
          const {darkMode} = value

          return (
            <HomePageBackground>
              <Header />
              <BelowHeaderBackground>
                <SideBarSection darkMode={darkMode} match={match} />
                <MainSection data-testid="gaming" darkMode={darkMode}>
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

export default Gaming
