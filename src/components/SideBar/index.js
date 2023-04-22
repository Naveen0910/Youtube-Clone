import {Link, withRouter} from 'react-router-dom'
import {
  AiOutlineHome,
  AiOutlineFire,
  AiOutlineVideoCameraAdd,
} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import './index.css'

const SideBar = props => {
  const onClickTrending = () => {
    const {history} = props
    history.push('/trending')
  }

  return (
    <div className="home-left-section">
      <div className="left-options-container">
        <button type="button" className="option-items-container">
          <AiOutlineHome className="home-icons" />
          <Link to="/">Home</Link>
        </button>
        <button
          onClick={onClickTrending}
          type="button"
          className="option-items-container"
        >
          <AiOutlineFire className="home-icons" />
          <Link to="/trending">Trending</Link>
        </button>
        <button type="button" className="option-items-container">
          <SiYoutubegaming className="home-icons" />
          <Link to="/gaming">Gaming</Link>
        </button>
        <button type="button" className="option-items-container">
          <AiOutlineVideoCameraAdd className="home-icons" />
          <Link to="/saved-videos">Saved Videos</Link>
        </button>
      </div>
      <div className="contact-us-section">
        <p>Contact us</p>
        <div className="links">
          <img
            className="socialmedia-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
          <img
            className="socialmedia-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
          <img
            className="socialmedia-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </div>
        <p className="para">
          Enjoy! Now to see your channels and recommendations!
        </p>
      </div>
    </div>
  )
}

export default withRouter(SideBar)
