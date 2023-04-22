import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import NavBar from '../NavBar'
import SideBar from '../SideBar'
import './index.css'

const apiFetchStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

const failedViewImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

class Home extends Component {
  state = {
    fetchedData: [],
    searchInput: '',
    fetchStatus: apiFetchStatus.initial,
  }

  componentDidMount() {
    this.fetchVideosData()
  }

  videoComponent = data => (
    <li className="video-component" key={data.id}>
      <Link to={`/videos/${data.id}`}>
        <div className="thumbnail-section">
          <img
            className="thumbnail"
            alt="video thumbnail"
            src={data.thumbNailUrl}
          />
        </div>
        <div className="video-description-section">
          <div className="channel-profile">
            <img
              className="profile-image-url"
              alt="channel logo"
              src={data.profileImageUrl}
            />
          </div>
          <div className="description-section">
            <p className="title">{data.title}</p>
            <p className="channel-name">{data.channelName}</p>
            <div className="views-date">
              <p className="views">{data.viewCount} views</p>
              <p className="publishedat">
                {formatDistanceToNow(new Date(data.publishedAt))}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )

  onSuccessfulFetch = () => {
    const {fetchedData} = this.state
    if (fetchedData.length !== 0) {
      return (
        <ul className="videos-container">
          {fetchedData.map(eachdata => this.videoComponent(eachdata))}
        </ul>
      )
    }
    return (
      <div className="no-videos-image-container">
        <img
          alt="no videos"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          className="no-videos-image"
        />
      </div>
    )
  }

  onClickRetry = () => {
    this.fetchVideosData()
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

  fetchVideosData = async () => {
    this.setState({fetchStatus: apiFetchStatus.loading})
    const {searchInput} = this.state
    const Url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    if (response.ok === true) {
      this.setState({fetchStatus: apiFetchStatus.success})
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

      this.setState({fetchedData: updatedData})
    } else {
      this.setState({fetchStatus: apiFetchStatus.failed})
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onRenderVideoContainer = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case apiFetchStatus.success:
        return this.onSuccessfulFetch()
      case apiFetchStatus.failed:
        return this.onFailedView()
      case apiFetchStatus.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderHomeSection = () => (
    <>
      <div className="banner-section">
        <div className="premium-paid-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            className="banner-website-logo"
            alt="nxt watch logo"
          />
          <p>Buy Nxt Watch Premium prepaid plans with UPI </p>
          <button className="get-now-button" type="button">
            GET IT NOW
          </button>
        </div>
        <button data-testid="close" className="close-button" type="button">
          <AiOutlineClose />
        </button>
      </div>
      <div className="videos-section">
        <div className="search-bar">
          <input
            type="search"
            placeholder="search"
            className="input-search"
            onChange={this.onChangeSearch}
          />
          <button
            onClick={this.fetchVideosData}
            data-testid="searchButton"
            type="button"
          >
            <AiOutlineSearch />
          </button>
        </div>
        <div className="videos">{this.onRenderVideoContainer()}</div>
      </div>
    </>
  )

  render() {
    return (
      <div className="home-main-container">
        <NavBar />
        <div className="home-sub-container">
          <SideBar />
          <div className="home-right-section">{this.renderHomeSection()}</div>
        </div>
      </div>
    )
  }
}

export default Home
