import {Link} from 'react-router-dom'

import {BsDot} from 'react-icons/bs'

import {formatDistanceToNow} from 'date-fns'

import {
  VideoContainer,
  Description,
  DescriptionContainer,
  CreatorLogo,
  VideoThumbnail,
  DetailsContainer,
  ChannelName,
  ViewsandDate,
  ViewsContainer,
} from './styledComponents'

import './index.css'

const GamingVideoItem = props => {
  const {eachVideo, darkMode} = props
  const {id, title, thumbnailUrl, viewCount} = eachVideo
  return (
    <Link className="gaming-link-item" to={`/videos/${id}`}>
      <VideoContainer>
        <VideoThumbnail alt="video thumbnail" src={thumbnailUrl} />
        <DescriptionContainer>
          <DetailsContainer>
            <Description darkMode={darkMode}>{title}</Description>

            <ViewsContainer>
              <ViewsandDate>{viewCount} Watching Worldwide</ViewsandDate>
            </ViewsContainer>
          </DetailsContainer>
        </DescriptionContainer>
      </VideoContainer>
    </Link>
  )
}

export default GamingVideoItem
