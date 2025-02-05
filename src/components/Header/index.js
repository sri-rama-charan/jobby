import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'
import {IoMdExit} from 'react-icons/io'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/')
  }

  return (
    <nav className="fixed-top nav-bg-container d-flex flex-row  align-items-center">
      <div style={{width: '20%'}}>
        <Link to="/" style={{textDecoration: 'none', cursor: 'pointer'}}>
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="nav-image"
          />
        </Link>
      </div>

      <div className="small-devices-nav-bar d-flex flex-row justify-content-center">
        <ul
          className="d-flex flex-row justify-content-center"
          style={{gap: '12px'}}
        >
          <Link to="/" style={{textDecoration: 'none'}}>
            <li
              key="Home"
              className=" d-none d-md-inline"
              style={{color: 'white'}}
            >
              Home
            </li>
          </Link>

          <Link to="/jobs" style={{textDecoration: 'none'}}>
            <li
              key="Jobs"
              className="home-desktop-icon d-none d-md-inline"
              style={{color: 'white'}}
            >
              Jobs
            </li>
          </Link>
        </ul>
      </div>
      <div
        style={{width: '20%'}}
        className="d-flex flex-row justify-content-end"
      >
        <button
          onClick={onLogout}
          type="button"
          className="btn logout-btn d-none d-md-inline"
        >
          Logout
        </button>
        <ul
          className="d-flex flex-row justify-content-end align-items-center"
          style={{gap: '10px', listStyleType: 'none'}}
        >
          <Link to="/" style={{textDecoration: 'none'}}>
            <li>
              <AiFillHome
                className="home-mobile-icon d-md-none"
                style={{color: 'white'}}
              />
            </li>
          </Link>
          <Link to="/jobs" style={{textDecoration: 'none'}}>
            <li>
              <FaSuitcase
                className="home-mobile-icon d-md-none"
                style={{color: 'white'}}
              />
            </li>
          </Link>
          <li>
            <button
              onClick={onLogout}
              className="btn"
              style={{backgroundColor: 'transparent'}}
              type="button"
            >
              <IoMdExit
                className="home-mobile-icon d-md-none"
                style={{color: 'white'}}
              />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
