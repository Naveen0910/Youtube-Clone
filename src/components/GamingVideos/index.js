import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineFire} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import './index.css'
import NavBar from '../NavBar'
import SideBar from '../SideBar'

const failedViewImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

const gamingStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class GamingVideos extends Component {
  state = {gameFetchedData: [], gamingFetchStatus: gamingStatus.initial}

  componentDidMount() {
    this.getGamingVideos()
  }

  videoComponent = () => {
    const {gameFetchedData} = this.state
    return (
      <ul className="game-entire-list">
        {gameFetchedData.map(data => (
          <li key={data.id} className="game-list-item">
            <img
              className="gaming-thumbnail"
              alt="thumbnail"
              src={data.thumbNailUrl}
            />
            <div className="game-container">
              <p className="game-title">{data.title}</p>
              <p className="game-view-count">{data.viewCount} views</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  getGamingVideos = async () => {
    this.setState({gamingFetchStatus: gamingStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const gamingUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(gamingUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbNailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        gameFetchedData: updatedData,
        gamingFetchStatus: gamingStatus.success,
      })
    } else {
      this.setState({gamingFetchStatus: gamingStatus.failed})
    }
  }

  onFailedView = () => (
    <div className="failed-view-container">
      <img
        className="failed-view-image"
        alt="failed view"
        src={failedViewImage}
      />
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRenderVideoContainer = () => {
    const {gamingFetchStatus} = this.state

    switch (gamingFetchStatus) {
      case gamingStatus.success:
        return this.videoComponent()
      case gamingStatus.loading:
        return this.renderLoadingView()
      case gamingStatus.failed:
        return this.onFailedView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <NavBar />
        <div className="game-main-container">
          <SideBar />
          <div className="gaming-videos-section">
            <div className="gaming-heading-and-refresh">
              <h1 className="gaming-heading">Gaming Videos</h1>
              <button
                type="button"
                className="refresh-button"
                onClick={this.getGamingVideos}
              >
                <AiOutlineFire className="refresh-icon" />
              </button>
            </div>
            <hr className="horizontal-line" />
            <div className="vids">{this.onRenderVideoContainer()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default GamingVideos
