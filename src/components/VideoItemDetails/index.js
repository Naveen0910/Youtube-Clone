import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike, AiFillSave} from 'react-icons/ai'

import NavBar from '../NavBar'
import SideBar from '../SideBar'
import './index.css'

class VideoItemDetails extends Component {
  state = {
    videoData: {},
    isLiked: false,
    isDisliked: false,
    isSaved: false,
  }

  componentDidMount() {
    this.videoData()
  }

  renderingVideoDetails = () => {
    const {videoData} = this.state
    console.log(videoData.videoUrl)
    return <ReactPlayer url={videoData.videoUrl} width="100%" height="60%" />
  }

  videoData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const videoDataUrl = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(videoDataUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscribersCount: data.video_details.channel.subscriber_count,
        description: data.video_details.description,
        id: data.video_details.id,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        videoCount: data.video_details.video_count,
      }
      this.setState({videoData: updatedData})
    }
  }

  onClickLike = () => {
    this.setState(prevState => ({isLiked: !prevState.isLiked}))
    this.setState({isDisliked: false})
  }

  onClickDislike = () => {
    this.setState(prevState => ({isDisliked: !prevState.isDisliked}))
    this.setState({isliked: false})
  }

  onClickSaved = () => {
    this.setState(prevState => ({isSaved: !prevState.isSaved}))
  }

  render() {
    const {videoData, isSaved, isLiked, isDisliked} = this.state

    return (
      <>
        <NavBar />
        <div className="video-item-main-container">
          <SideBar />
          <div className="video-item-sub-container">
            {this.renderingVideoDetails()}
            <div className="video-info-container">
              <p>{videoData.title}</p>
              <div className="like-dislike-container">
                <div className="video-item-view-count">
                  <p>{videoData.videoCount} views</p>
                </div>
                <div className="like-dislike-save">
                  <button
                    onClick={this.onClickLike}
                    type="button"
                    className="like-button"
                  >
                    <AiOutlineLike
                      className={isLiked ? 'active' : 'non-active'}
                    />
                    <p className={isLiked ? 'active' : 'non-active'}>Like</p>
                  </button>
                  <button
                    onClick={this.onClickDislike}
                    type="button"
                    className="like-button"
                  >
                    <AiOutlineDislike
                      className={isDisliked ? 'active' : 'non-active'}
                    />
                    <p className={isDisliked ? 'active' : 'non-active'}>
                      Dislike
                    </p>
                  </button>
                  <button
                    onClick={this.onClickSaved}
                    type="button"
                    className="like-button"
                  >
                    <AiFillSave className={isSaved ? 'active' : 'non-active'} />{' '}
                    <p className={isSaved ? 'active' : 'non-active'}>
                      {isSaved ? 'Saved' : 'Save'}
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div className="video-channel-container">
              <div>
                <img
                  className="video-profile-image"
                  src={videoData.profileImageUrl}
                />
              </div>
              <div>
                <p className="video-channel-name">{videoData.name}</p>
                <p className="video-channel-subcribers">
                  {videoData.subscribersCount}
                </p>
                <p className="video-channel-description">
                  {videoData.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default VideoItemDetails
