import React from 'react'

const ModeContext = React.createContext({
  darkMode: false,
  changeMode: () => {},
})

export default ModeContext
