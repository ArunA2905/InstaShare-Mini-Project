import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import RouteContext from '../../Context/RouteContext'

class Header extends Component {
  state = {
    onHamburger: false,
    onSearch: false,
  }

  onClickedHamburger = () => {
    this.setState({onHamburger: true, onSearch: false})
  }

  onClickedCloseMenu = () => {
    this.setState({onHamburger: false, onSearch: false})
  }

  onClickedSearch = () => {
    this.setState({onSearch: true})
  }

  render() {
    const {onClickedSearchBar, onChangeSearchStatus, selectedRoute} = this.props
    const {onHamburger, onSearch} = this.state
    return (
      <RouteContext.Consumer>
        {value => {
          const {onChangeSearchCaption, searchCaption} = value

          const onChangeSearchInput = event => {
            onChangeSearchCaption(event.target.value)
            onChangeSearchStatus(event.target.value)
          }

          const onClickedLogout = () => {
            Cookies.remove('jwt_token')
            const {history} = this.props
            history.replace('/login')
          }

          const onClickedSearchBtn = () => {
            onClickedSearchBar(searchCaption)
            onChangeSearchCaption('')
          }

          const onClickedEnterBtn = event => {
            if (event.key === 'Enter') {
              onClickedSearchBar(searchCaption)
              onChangeSearchCaption('')
            }
          }

          const renderSearchCard = () => (
            <div className="sm-navbar-container">
              <div className="sm-navbar-content-card">
                <div className="sm-search-card">
                  <input
                    type="search"
                    className="sm-search-bar"
                    placeholder="Search Caption"
                    value={searchCaption}
                    onChange={onChangeSearchInput}
                    onKeyDown={onClickedEnterBtn}
                  />
                  <button
                    type="button"
                    className="sm-search-btn"
                    // eslint-disable-next-line react/no-unknown-property
                    testid="searchIcon"
                    onClick={onClickedSearchBtn}
                  >
                    <FaSearch size={16} />
                  </button>
                </div>
                <button
                  type="button"
                  className="closeMenu-button"
                  onClick={this.onClickedCloseMenu}
                >
                  <AiFillCloseCircle size={25} />
                </button>
              </div>
            </div>
          )

          const onClickedChangeRoute = () => {
            onChangeSearchStatus('')
          }

          const renderNavBarContent = () => (
            <div className="sm-navbar-container">
              <div className="sm-navbar-content-card">
                <ul className="sm-link-card">
                  <li
                    className="sm-nav-list-item"
                    onClick={onClickedChangeRoute}
                  >
                    <Link
                      to="/"
                      className={
                        selectedRoute === 'Home'
                          ? `sm-nav-link sm-selectedLink`
                          : 'sm-nav-link'
                      }
                    >
                      Home
                    </Link>
                  </li>
                  <li
                    className={
                      selectedRoute === 'Search'
                        ? `sm-nav-link sm-nav-list-item sm-selectedLink`
                        : 'sm-nav-link sm-nav-list-item'
                    }
                    onClick={this.onClickedSearch}
                  >
                    Search
                  </li>
                  <li
                    className="sm-nav-list-item"
                    onClick={onClickedChangeRoute}
                  >
                    <Link
                      to="/my-profile"
                      className={
                        selectedRoute === 'my-Profile'
                          ? `sm-nav-link sm-selectedLink`
                          : 'sm-nav-link'
                      }
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
                <button
                  type="button"
                  className="sm-logout-btn"
                  onClick={onClickedLogout}
                >
                  Logout
                </button>

                <button
                  type="button"
                  className="closeMenu-button"
                  onClick={this.onClickedCloseMenu}
                >
                  <AiFillCloseCircle size={25} />
                </button>
              </div>
            </div>
          )

          const renderNavContent = () =>
            onSearch ? renderSearchCard() : renderNavBarContent()

          return (
            <>
              <nav className="sm-navbar-container">
                <div className="sm-navbar-content">
                  <div className="sm-navbar-logo-card">
                    <Link to="/">
                      <img
                        src="https://res.cloudinary.com/dgbrmgffm/image/upload/v1675321631/samples/InstaShare%20PNG/Standard_Collection_8_pyny2p.png"
                        alt="website logo"
                        className="sm-navbar-website-logo"
                      />
                    </Link>
                    <h1 className="sm-navbar-logo-title">Insta Share</h1>
                  </div>

                  <button
                    type="button"
                    className="hamburger-button"
                    onClick={this.onClickedHamburger}
                  >
                    <GiHamburgerMenu size={25} />
                  </button>
                </div>
              </nav>
              {onHamburger ? renderNavContent() : null}
              <hr className="sm-header-line" />
            </>
          )
        }}
      </RouteContext.Consumer>
    )
  }
}

export default withRouter(Header)
