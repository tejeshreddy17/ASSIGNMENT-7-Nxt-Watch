import styled from 'styled-components'

export const NavbarSection = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px 20px 25px;
  font-family: Roboto;
  background-color: ${props => (props.darkMode ? '#212121' : 'white')};
`
export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
  justify-content: center;
`
export const OptionsSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
export const HeaderLogo = styled.img`
  width: 150px;
`
export const LogoutButton = styled.button`
  background-color: transparent;
  padding: 5px 15px 5px 15px;
  border-radius: 2px;
  border: ${props =>
    props.darkMode ? '1px solid #f9f9f9' : '1px solid #3b82f6'};
  color: ${props => (props.darkMode ? '#f9f9f9' : '#3b82f6')};
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`
export const ProfileImage = styled.img`
  height: 30px;
  margin-right: 25px;
`
export const ChangeModeButton = styled.button`
  margin-right: 25px;
  font-size: 25px;
  border: none;
  background-color: transparent;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${props => (props.darkMode ? 'white' : '#181818')};
`
export const PopupDescription = styled.p`
  color: #1e293b;
  font-weight: 500;
  font-size: 20px;
`
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  align-items: center;
  margin-top: 30px;
  width: 75%;
`

export const ConfirmButton = styled.button`
  background-color: #3b82f6;
  padding: 10px 15px 10px 15px;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
`
export const CancelButton = styled.button`
  background-color: transparent;
  padding: 10px 15px 10px 15px;
  margin-left: 15px;
  margin-right: 15px;
  border: 1px solid #7e858e;# #181818
  color: #7e858e;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
`
