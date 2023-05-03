import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'

import SavedVideosContext from './context/SavedVideosContext'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import TrendingVideos from './components/TrendingVideos'
import GamingVideos from './components/GamingVideos'
import VideoItemDetails from './components/VideoItemDetails'

class App extends Component {
  state = {savedVideos: [], isDarkTheme: false}

  addToSavedVideos = data => {
    const {savedVideos} = this.state
    const productObject = savedVideos.find(
      eachVideo => eachVideo.id === data.id,
    )
  }

  removeFromSavedVideos = () => {}

  changeCurrentTheme = () => {}

  render() {
    const {savedVideos, isDarkTheme} = this.state
    return (
      <SavedVideosContext.Provider
        value={{
          savedVideos,
          isDarkTheme,
          addToSavedVideos: this.addToSavedVideos,
          removeFromSavedVideos: this.removeFromSavedVideos,
          changeCurrentTheme: this.changeCurrentTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={TrendingVideos} />
          <ProtectedRoute exact path="/gaming" component={GamingVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
        </Switch>
      </SavedVideosContext.Provider>
    )
  }
}

export default App
