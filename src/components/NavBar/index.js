import {FaMoon} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

function NavBar() {
  return (
    <ul className="nav-main-container">
      <li className="nav-logo-section">
        <Link to="/">
          <img
            className="nav-website-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          />
        </Link>
      </li>
      <li className="nav-options-section">
        <button type="button" className="theme-button" data-testid="theme">
          <FaMoon />
        </button>
        <img
          className="nav-profile"
          alt="profile"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
        />
        <button type="button">Logout</button>
      </li>
    </ul>
  )
}

export default NavBar
