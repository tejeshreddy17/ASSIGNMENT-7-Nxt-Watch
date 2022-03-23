import styled from 'styled-components'

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`
export const Description = styled.p`
  color: ${props => (props.darkMode ? '#f9f9f9' : '#1e293b')};
  color: ;
  margin-top: 0px;
  margin-bottom: 10px;
  font-weight: 400;
`
export const VideoThumbnail = styled.img`
  height: 160px;
  @media screen and (max-width: 768px) {
    height: 250px;
  }
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
`

export const CreatorLogo = styled.img`
  height: 38px;
  margin-right: 15px;
`
export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
export const ChannelName = styled.p`
  margin-top: 0px;
  color: #909090;
  margin-bottom: 5px;
  font-weight: 400;
`
export const ViewsandDate = styled.p`
  color: #909090;
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: 400;
  margin-right: 4px;
`
export const ViewsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`
export const SpanElement = styled.span`
  font-weight: bold;
  font-size: 20px;
`
