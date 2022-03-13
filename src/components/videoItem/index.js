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

const HomeVideoItem = props => {
  const {eachVideo, darkMode} = props
  const {id, channel, title, thumbnailUrl, viewCount, publishedAt} = eachVideo
  return (
    <Link className="link-item" to={`/videos/${id}`}>
      <VideoContainer>
        <VideoThumbnail alt="video thumbnail" src={thumbnailUrl} />

        <DescriptionContainer>
          <CreatorLogo alt="channel logo" src={channel.profileImageUrl} />
          <DetailsContainer>
            <Description darkMode={darkMode}>{title}</Description>
            <ChannelName>{channel.name}</ChannelName>
            <ViewsContainer>
              <ViewsandDate>{viewCount} views </ViewsandDate>
              <BsDot className="dot" />
              <ViewsandDate>
                {formatDistanceToNow(new Date(publishedAt))}
              </ViewsandDate>
            </ViewsContainer>
          </DetailsContainer>
        </DescriptionContainer>
      </VideoContainer>
    </Link>
  )
}

export default HomeVideoItem
