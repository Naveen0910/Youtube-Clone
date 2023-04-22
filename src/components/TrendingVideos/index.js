import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineFire} from 'react-icons/ai'
import {formatDistanceToNow} from 'date-fns'

import Loader from 'react-loader-spinner'
import './index.css'
import NavBar from '../NavBar'
import SideBar from '../SideBar'

const failedViewImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

const trendingStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class TrendingVideos extends Component {
  state = {fetchedData: [], trendingFetchStatus: trendingStatus.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  videoComponent = () => {
    const {fetchedData} = this.state

    return (
      <ul className="entire-list">
        {fetchedData.map(data => (
          <li key={data.id} className="list-item">
            <img
              className="trend-thumbnail"
              alt="thumbnail"
              src={data.thumbNailUrl}
            />
            <div className="info-container">
              <p className="trend-title">{data.title}</p>
              <p className="trend-channel-name">{data.channelName}</p>
              <div className="year-and-views">
                <p className="trend-viewcount">{data.viewCount} views</p>
                <p>.</p>
                <p className="trend-published-date">
                  {formatDistanceToNow(new Date(data.publishedAt))}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  getTrendingVideos = async () => {
    this.setState({trendingFetchStatus: trendingStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const trendingUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(trendingUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        channelName: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        title: eachVideo.title,
        thumbNailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        fetchedData: updatedData,
        trendingFetchStatus: trendingStatus.success,
      })
    } else {
      this.setState({trendingFetchStatus: trendingStatus.failed})
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
    const {trendingFetchStatus} = this.state

    switch (trendingFetchStatus) {
      case trendingStatus.success:
        return this.videoComponent()
      case trendingStatus.failed:
        return this.onFailedView()
      case trendingStatus.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <NavBar />

        <div className="trending-main-container">
          <SideBar />
          <div className="trending-videos">
            <div className="top-heading">
              <AiOutlineFire className="trending-logo" />
              <h1 className="heading">Trending</h1>
            </div>
            {this.onRenderVideoContainer()}
          </div>
        </div>
      </>
    )
  }
}
export default TrendingVideos
