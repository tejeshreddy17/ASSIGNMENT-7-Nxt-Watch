import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaFire} from 'react-icons/fa'

import Header from '../Header'
import ModeContext from '../Context'

import SideBarSection from '../SidebarSection'

import TrendingVideoItem from '../TrendingVideoItem'
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

class SavedVideos extends Component {
  state = {
    apiStatus: apiLoadingStatus.initial,
  }

  componentDidMount() {
    this.gettingVideos()
  }

  gettingVideos = async () => {
    this.setState({apiStatus: apiLoadingStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/trending`
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

  renderingUI = (darkMode, savedVideos) => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiLoadingStatus.success:
        return this.renderingContent(darkMode, savedVideos)
      case apiLoadingStatus.failure:
        return this.renderingFailureView(darkMode)
      case apiLoadingStatus.loading:
        return this.renderingLoader()
      default:
        return null
    }
  }

  renderingContent = (darkMode, savedVideos) => {
    if (savedVideos.length === 0) {
      return (
        <FailureContainer>
          <FailureImage
            alt="no saved videos"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          />
          <HeadingFailure darkMode={darkMode}>
            No saved videos found
          </HeadingFailure>
          <FailureDescription darkMode={darkMode}>
            You can save your videos while watching them
          </FailureDescription>
        </FailureContainer>
      )
    }
    return (
      <>
        <TrendingHeadingContainer darkMode={darkMode}>
          <TrendingLogo darkMode={darkMode}>
            <FaFire />
          </TrendingLogo>
          <TrendingsectionHeading darkMode={darkMode}>
            Saved Videos
          </TrendingsectionHeading>
        </TrendingHeadingContainer>

        <VideosSection>
          {savedVideos.map(eachData => (
            <TrendingVideoItem
              darkMode={darkMode}
              eachVideo={eachData}
              key={eachData.id}
            />
          ))}
        </VideosSection>
      </>
    )
  }

  render() {
    const {match} = this.props

    const {path} = match
    return (
      <ModeContext.Consumer>
        {value => {
          const {darkMode, savedVideos} = value

          return (
            <HomePageBackground>
              <Header />
              <BelowHeaderBackground>
                <SideBarSection darkMode={darkMode} match={match} />
                <MainSection data-testid="savedVideos" darkMode={darkMode}>
                  {this.renderingUI(darkMode, savedVideos)}
                </MainSection>
              </BelowHeaderBackground>
            </HomePageBackground>
          )
        }}
      </ModeContext.Consumer>
    )
  }
}

export default SavedVideos
