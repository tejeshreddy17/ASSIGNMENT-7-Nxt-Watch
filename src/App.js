import {Component} from 'react'

import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

import Login from './components/Login'

import Home from './components/Home'

import Trending from './components/Trending'

import Gaming from './components/Gaming'

import SavedVideos from './components/SavedVideos'

import VideoPlayer from './components/VideoPlayer'

import ModeContext from './components/Context'

import './App.css'

// Replace your code here
class App extends Component {
  state = {darkMode: false, savedVideos: []}

  changeMode = () => {
    this.setState(prevState => ({darkMode: !prevState.darkMode}))
  }

  updatingSavedVideos = (newVideo, saveStatus, updatingSaveStatusList) => {
    console.log(updatingSaveStatusList)

    const {savedVideos} = this.state
    if (savedVideos.length === 0) {
      this.setState({savedVideos: [updatingSaveStatusList]})
    }

    if (savedVideos.length > 0) {
      const othersObjects = savedVideos.filter(
        eachVideo => eachVideo.id !== updatingSaveStatusList.id,
      )
      const selectedObjectList = savedVideos.filter(
        eachVideo => eachVideo.id === updatingSaveStatusList.id,
      )

      const selectedObjectListwithSave =
        selectedObjectList.length === 0
          ? [{...updatingSaveStatusList}]
          : [
              {
                ...selectedObjectList[0],
                isSaved: updatingSaveStatusList.isSaved,
              },
            ]

      const newSavedVideosList = [
        ...othersObjects,
        ...selectedObjectListwithSave,
      ]
      this.setState({
        savedVideos: newSavedVideosList.filter(
          eachVideo => eachVideo.isSaved === true,
        ),
      })
    }
  }

  render() {
    const {darkMode, savedVideos} = this.state

    return (
      <ModeContext.Provider
        value={{
          darkMode,
          changeMode: this.changeMode,
          updatingSavedVideos: this.updatingSavedVideos,
          savedVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />

          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/videos/:id" component={VideoPlayer} />
        </Switch>
      </ModeContext.Provider>
    )
  }
}

export default App
