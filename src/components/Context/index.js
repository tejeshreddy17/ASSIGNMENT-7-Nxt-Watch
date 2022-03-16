import React from 'react'

const ModeContext = React.createContext({
  darkMode: false,
  changeMode: () => {},
  savedVideos: [],
  updatingSavedVideos: () => {},
})

export default ModeContext
