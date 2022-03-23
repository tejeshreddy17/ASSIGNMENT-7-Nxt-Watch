import {Component} from 'react'
import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import ReactPlayer from 'react-player'

import Loader from 'react-loader-spinner'

import {formatDistanceToNow} from 'date-fns'

import {AiFillHome} from 'react-icons/ai'

import {RiMenuAddLine} from 'react-icons/ri'

import {BiDislike, BiLike} from 'react-icons/bi'

import {FaFire} from 'react-icons/fa'

import {SiYoutubegaming} from 'react-icons/si'
import {BsDot} from 'react-icons/bs'
import Header from '../Header'

import ModeContext from '../Context'

import './index.css'

import {
  HomePageBackground,
  BelowHeaderBackground,
  SidebarSection,
  MainSection,
  TestCase,
  VideosSection,
  HomeIcon,
  SideBarHeadings,
  SidebarFooterSection,
  Sidebarlogos,
  SidebarLogosContainer,
  ContactusHeading,
  FailureImage,
  HeadingFailure,
  FailureDescription,
  FailureTryAgain,
  FailureContainer,
  DescriptionContainer,
  CreatorLogo,
  DetailsContainer,
  ViewsandDate,
  Description,
  ChannelName,
  ViewsContainer,
  LikeDislikeContainer,
  LikesButton,
  SavedButton,
  DisLikesButton,
  VideoPlayerLogoCont,
  Line,
  VideoPlayerDescriptionCOnt,
} from './styledComponents'

const apiLoadingStatus = {
  initial: 'initial',
  success: 'success',
  loading: 'loading',
  failure: 'failure',
}

class VideoPlayer extends Component {
  state = {
    videos: {channel: {}},
    apiStatus: apiLoadingStatus.initial,
    likeStatus: false,
    dislikeStatus: false,
    saveStatus: false,
  }

  componentDidMount() {
    this.gettingVideos()
  }

  gettingVideos = async () => {
    this.setState({apiStatus: apiLoadingStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const formattedData = {
      channel: {
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
      },
      videoUrl: data.video_details.video_url,
      id: data.video_details.id,
      thumbnailUrl: data.video_details.thumbnail_url,
      title: data.video_details.title,
      viewCount: data.video_details.view_count,
      description: data.video_details.description,
      publishedAt: data.video_details.published_at,
      isSaved: false,
    }

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
        We are having some trouble to complete your request. Please try again.
      </FailureDescription>
      <FailureTryAgain onClick={this.gettingVideos}>Retry</FailureTryAgain>
    </FailureContainer>
  )

  updatingLikeStatus = () => {
    this.setState(prevState => ({
      likeStatus: !prevState.likeStatus,
      dislikeStatus: false,
    }))
  }

  updatingdisLikeStatus = () => {
    this.setState(prevState => ({
      dislikeStatus: !prevState.dislikeStatus,
      likeStatus: false,
    }))
  }

  updatingSaveStatus = () => {
    this.setState(prevState => ({
      saveStatus: !prevState.saveStatus,
    }))
  }

  renderingContent = darkMode => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const {videos} = this.state

    const {likeStatus, dislikeStatus, saveStatus} = this.state
    const {
      publishedAt,
      channel,
      title,
      description,

      viewCount,
    } = videos

    return (
      <ModeContext.Consumer>
        {value => {
          const {updatingSavedVideos, savedVideos} = value

          const savingVideo = () => {
            if (savedVideos.length === 0) {
              const updatingSaveStatusList = {...videos, isSaved: !saveStatus}
              updatingSavedVideos(
                videos,
                saveStatus,
                updatingSaveStatusList,
                id,
              )
            } else {
              const videoOject = savedVideos.filter(
                eachVideo => eachVideo.id === id,
              )
              const updatingSaveStatusList =
                videoOject.length === 0
                  ? {...videos, isSaved: !saveStatus}
                  : {
                      ...videoOject[0],
                      isSaved: !videoOject[0].isSaved,
                    }
              updatingSavedVideos(
                videos,
                saveStatus,
                updatingSaveStatusList,
                id,
              )
            }

            this.updatingSaveStatus()
          }

          const playedVideoObject = savedVideos.filter(
            eachVideo => eachVideo.id === id,
          )

          return (
            <VideosSection>
              <ReactPlayer
                width="100%"
                height="80%"
                url={videos.videoUrl}
                controls
              />
              <DescriptionContainer>
                <DetailsContainer>
                  <Description darkMode={darkMode}>{title}</Description>
                  <ViewsContainer>
                    <ViewsandDate>{viewCount} views </ViewsandDate>
                    <BsDot className="dot" />
                    <ViewsandDate>
                      {formatDistanceToNow(new Date(publishedAt))}
                    </ViewsandDate>
                    <LikeDislikeContainer>
                      <LikesButton
                        likeStatus={likeStatus}
                        onClick={this.updatingLikeStatus}
                      >
                        <BiLike /> Like
                      </LikesButton>
                      <DisLikesButton
                        dislikeStatus={dislikeStatus}
                        onClick={this.updatingdisLikeStatus}
                      >
                        <BiDislike /> Dislike
                      </DisLikesButton>
                      <SavedButton
                        onClick={savingVideo}
                        saveStatus={playedVideoObject.length !== 0}
                      >
                        <RiMenuAddLine />
                        {playedVideoObject.length !== 0 ? 'Saved' : 'Save'}
                      </SavedButton>
                    </LikeDislikeContainer>
                  </ViewsContainer>
                  <Line />
                  <VideoPlayerLogoCont>
                    <CreatorLogo src={channel.profileImageUrl} />
                    <VideoPlayerDescriptionCOnt>
                      <ChannelName>{channel.name}</ChannelName>
                      <ChannelName>
                        {channel.subscriberCount} Subscribers
                      </ChannelName>
                      <ChannelName>{description}</ChannelName>
                    </VideoPlayerDescriptionCOnt>
                  </VideoPlayerLogoCont>
                </DetailsContainer>
              </DescriptionContainer>
            </VideosSection>
          )
        }}
      </ModeContext.Consumer>
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
                    <TestCase
                      darkMode={darkMode}
                      outline={path === '/trending'}
                    >
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
                      <HomeIcon outline={path === '/saved-videos'}>
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
                      Enjoy! Now to see your channels and recommendations!
                    </ContactusHeading>
                  </SidebarFooterSection>
                </SidebarSection>
                <MainSection data-testid="videoItemDetails" darkMode={darkMode}>
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

export default VideoPlayer
