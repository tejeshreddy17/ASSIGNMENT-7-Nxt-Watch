import styled from 'styled-components'

export const HomePageBackground = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start;
`
export const BelowHeaderBackground = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow-y: auto;
`
export const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 250px;
  flex-shrink: 0;
  background-color: ${props => (props.darkMode ? '#212121' : 'white')};
`
export const MainSection = styled.div`
  background-color: ${props => (props.darkMode ? '#181818' : '#f9f9f9')};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 70%;
  flex-grow: 1;
  overflow-y: auto;
`
export const VideosSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-grow: 1;
  padding: 20px;
`
export const TestCase = styled.div`
  background-color: ${props => {
    if (props.outline) {
      return props.darkMode ? '#383838' : '#e2e8f0'
    }
    return 'transparent'
  }};
  display: flex;
  padding: 12px 5px 10px 15px;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-start;
  color: ${props => (props.outline ? ' #1e293b' : '#475569')};
  font-weight: ${props => (props.outline ? ' bold' : '400')};
`

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 35px;
  width: 550px;
  margin-left: 20px;
  margin-top: 20px;
`
export const SearchButton = styled.button`
  border: none;
  width: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border: ${props =>
    props.darkMode ? '1px solid #3A393A' : '1px solid #ebebeb'};
  cursor: pointer;
  background-color: ${props => (props.darkMode ? '#313031' : '')};
  color: ${props => (props.darkMode ? '#ebebeb' : '')};
`
export const SearchInput = styled.input`
  height: 35px;
  padding-left: 10px;
  border: none;
  width: 450px;
  color: ${props => (props.darkMode ? '#ebebeb' : '')};
  outline: none;
  background-color: ${props => (props.darkMode ? 'transparent' : '')};
  border: ${props =>
    props.darkMode ? '1px solid #3A393A' : '1px solid #ebebeb '};
`
export const HomeIcon = styled.button`
  color: ${props => (props.outline ? ' red' : '#475569')};
  background-color: transparent;
  border: none;
  margin: 0px 15px 0px 0px;
  font-size: 20px;
  padding: 0px;
`
export const SideBarHeadings = styled.p`
  font-size: 16px;
  margin: 0px 0px 4px;
  color: ${props => (props.darkMode ? '#f9f9f9' : '')};
`
export const BannerSection = styled.div`
  background-color: white;
  display: flex;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  flex-direction: column;
  padding: 20px;
`
export const BannerLogo = styled.img`
  width: 200px;
  height: 50px;
`
export const BannerButton = styled.button`
  background-color: transparent;
  border: 1.5px solid #313131;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  align-self: flex-start;
`
export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  align-self: flex-end;
  font-size: 20px;
  cursor: pointer;
`
export const Bannerheading = styled.h1`
  font-weight: 500;
  color: #313131;
  font-size: 18px;
  width: 360px;
  margin-bottom: 25px;
  margin-top: 25px;
`
export const SidebarFooterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  flex-grow: 1;
  padding-left: 15px;
  padding-bottom: 25px;
  padding-right: 10px;
`
export const Sidebarlogos = styled.img`
  height: 30px;
  margin-right: 15px;
`
export const SidebarLogosContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
`
export const ContactusHeading = styled.p`
  font-size: ${props => props.font};
  color: #475569;
  font-weight: ${props => props.weight};
`

export const FailureImage = styled.img`
  align-self: center;
  height: 250px;
  margin-top: 15px;
`
export const HeadingFailure = styled.h1`
  color: ${props => (props.darkMode ? '#f9f9f9' : '')};
  text-align: center;
  font-size: 28px;
`
export const FailureDescription = styled.p`
  font-size: 16px;
  text-align: center;
  margin-top: 5px;
`
export const FailureTryAgain = styled.button`
  border: none;
  background-color: #4f46e5;
  color: white;
  align-self: center;
  width: 100px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
`
