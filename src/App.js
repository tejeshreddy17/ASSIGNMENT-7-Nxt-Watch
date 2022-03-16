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

  updatingSavedVideos = (newVideo, saveStatus, updatingSaveStatusList, id) => {
    console.log(updatingSaveStatusList)

    const {savedVideos} = this.state
    console.log(savedVideos)

    savedVideos.map(eachVideo => {
      if (eachVideo.id === id) {
        return console.log('if')
      }
      return console.log('else')
    })

    if (savedVideos.length === 0) {
      this.setState({savedVideos: [updatingSaveStatusList]})
    } else {
      this.setState(prevState => ({
        savedVideos: prevState.savedVideos.map(eachVideo => {
          if (eachVideo.id === id) {
            return {...eachVideo, isSaved: !eachVideo.isSaved}
          }
          return eachVideo
        }),
      }))
    }

    const addingVideo = () => {
      if (savedVideos.includes(newVideo)) {
        this.setState(prevState => ({
          savedVideos: [...prevState.savedVideos],
        }))
      } else {
        this.setState(prevState => ({
          savedVideos: [...prevState.savedVideos, updatingSaveStatusList],
        }))
      }
    }

    const deletingVideo = () => {
      if (savedVideos.includes(newVideo)) {
        this.setState(prevState => ({
          savedVideos: prevState.savedVideos.filter(
            eachVideo => eachVideo !== updatingSaveStatusList,
          ),
        }))
      } else {
        this.setState(prevState => ({
          savedVideos: [...prevState.savedVideos],
        }))
      }
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
