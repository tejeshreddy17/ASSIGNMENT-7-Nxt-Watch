import styled from 'styled-components'

export const SidebarSection = styled.div`
  display: none;
  flex-direction: column;
  justify-content: flex-start;
  width: 250px;
  flex-shrink: 0;
  background-color: ${props => (props.darkMode ? '#212121' : 'white')};

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 250px;
    flex-shrink: 0;
    background-color: ${props => (props.darkMode ? '#212121' : 'white')};
  }
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
