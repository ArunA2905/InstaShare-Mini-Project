import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Header from '../Header'
import SmHeader from '../SmHeader'
import UserPostItem from '../UserPostItem'

import PostItemDetails from '../PostItemDetails'

// import RouteContext from '../../Context/RouteContext'

const status = {
  initial: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class MyProfile extends Component {
  state = {
    myProfile: {},
    storyList: [],
    postList: [],
    profileStatus: status.initial,
    caption: '',
    searchStatus: status.initial,
    isSearched: false,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  checkCaption = () => {
    const {caption} = this.state
    if (caption.length === 0) {
      this.setState({isSearched: false})
    }
  }

  getProfileDetails = async () => {
    this.setState({profileStatus: status.initial})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const {profile} = data
      // console.log(data)
      const updatedProfileDetails = {
        id: profile.id,
        userID: profile.user_id,
        userName: profile.user_name,
        profilePic: profile.profile_pic,
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        userBio: profile.user_bio,
        postsCount: profile.posts_count,
        stories: profile.stories,
      }
      const updatedStoryList = profile.stories
      const updatedPostList = profile.posts
      this.setState({
        myProfile: updatedProfileDetails,
        storyList: updatedStoryList,
        postList: updatedPostList,
        profileStatus: status.success,
      })
    } else {
      this.setState({profileStatus: status.failed})
    }
  }

  renderProfileDetails = () => {
    const {myProfile} = this.state
    const {
      userName,
      profilePic,
      followersCount,
      followingCount,
      userBio,
      postsCount,
      userID,
    } = myProfile

    return (
      <>
        <h1 className="profile-user-name sm-profile-user-name">{userName}</h1>
        <div className="profile-details-container">
          <img src={profilePic} alt="my profile" className="profile-pic" />
          <div className="profile-details-card">
            <h1 className="profile-user-name lg-profile-user-name">
              {userName}
            </h1>
            <div className="profile-count-container">
              <div className="profile-count-card">
                <span className="count">{postsCount}</span>
                <p className="profile-count-details">posts</p>
              </div>
              <div className="profile-count-card">
                <span className="count">{followersCount}</span>
                <p className="profile-count-details">followers</p>
              </div>
              <div className="profile-count-card">
                <span className="count">{followingCount}</span>
                <p className="profile-count-details">following</p>
              </div>
            </div>
            <p className="lg-profile-name-bio profile-name-bio">{userID}</p>
            <p className="lg-profile-bio profile-bio">{userBio}</p>
          </div>
        </div>
        <p className="sm-profile-name-bio profile-name-bio">{userID}</p>
        <p className="sm-profile-bio profile-bio">{userBio}</p>
      </>
    )
  }

  renderStoryDetails = () => {
    const {storyList} = this.state

    return (
      <ul className="myProfile-story-container">
        {storyList.map(each => (
          <li key={each.id} className="myProfile-story-card">
            <img src={each.image} alt="my story" className="myProfile-story" />
          </li>
        ))}
      </ul>
    )
  }

  renderPostItem = () => {
    const {postList} = this.state

    return (
      <>
        <div className="profile-post-card">
          <BsGrid3X3 className="profile-post-card-icon" />
          <h1 className="profile-posts-title">Posts</h1>
        </div>
        {postList.length > 0 ? (
          <ul className="profile-post-item-container">
            {postList.map(each => (
              <UserPostItem key={each.id} postItem={each} route="my" />
            ))}
          </ul>
        ) : (
          <div className="no-post-container">
            <div className="no-post-card">
              <div className="no-post-icon-card">
                <BiCamera className="no-post-icon" />
              </div>
              <h1 className="No-post-msg">No Posts</h1>
            </div>
          </div>
        )}
      </>
    )
  }

  renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="profile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderMyProfile = () => (
    <>
      {this.renderProfileDetails()}
      {this.renderStoryDetails()}
      <hr className="user-profile-line" />
      {this.renderPostItem()}
    </>
  )

  onClickedTryAgain = () => {
    this.getProfileDetails()
  }

  renderFailedView = () => (
    <div className="profile-failure-container">
      <div className="profile-failure-card">
        <img
          src="https://res.cloudinary.com/dgbrmgffm/image/upload/v1675935116/samples/InstaShare%20PNG/Group_7522_expew0.png"
          alt="failure view"
          className="profile-failure-view-img"
        />
        <p className="profile-error-msg">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="profile-failure-btn"
          onClick={this.onClickedTryAgain}
        >
          Try again
        </button>
      </div>
    </div>
  )

  renderProfileSection = () => {
    const {profileStatus} = this.state
    let profileMode

    switch (profileStatus) {
      case status.initial:
        profileMode = this.renderLoadingView()
        break
      case status.success:
        profileMode = this.renderMyProfile()
        break
      case status.failed:
        profileMode = this.renderFailedView()
        break
      default:
        break
    }
    return profileMode
  }

  getSearchPost = async () => {
    this.setState({searchStatus: status.initial, isSearched: true})
    const {caption} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${caption}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedUserPostDetails = data.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postDetails: {
          imageUrl: each.post_details.image_url,
          caption: each.post_details.caption,
        },
        likesCount: each.likes_count,
        comments: each.comments.map(eachItem => ({
          userName: eachItem.user_name,
          userID: eachItem.user_id,
          comment: eachItem.comment,
        })),
        createdAt: each.created_at,
      }))
      this.setState({
        searchPostList: updatedUserPostDetails,
        searchStatus: status.success,
      })
      this.checkCaption()
    } else {
      this.setState({searchStatus: status.failed})
    }
  }

  onClickedSearchBar = searchCaption => {
    this.setState({caption: searchCaption}, this.getSearchPost)
  }

  onChangeSearchStatus = value => {
    if (value === '') {
      this.setState({isSearched: false})
    }
  }

  renderLoading = () => {
    const {isSearched} = this.state
    return (
      <div
        className={
          isSearched ? 'loader-container post-section' : 'loader-container'
        }
        // eslint-disable-next-line react/no-unknown-property
        testid="loader"
      >
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
      </div>
    )
  }

  renderSearchFailureView = () => (
    <div className="failure-bg">
      <div className="home-failure-container">
        <img
          src="https://res.cloudinary.com/dgbrmgffm/image/upload/v1675935116/samples/InstaShare%20PNG/Group_7522_expew0.png"
          alt="failure view"
          className="search-failure-view-img"
        />
        <p className="home-error-msg">Something went wrong. Please try again</p>
        <button
          type="button"
          className="home-failure-btn"
          onClick={this.onClickedStoryTryAgain}
        >
          Try again
        </button>
      </div>
    </div>
  )

  renderSearchCaption = () => {
    const {searchPostList} = this.state

    return (
      <>
        {searchPostList.length > 0 ? (
          <>
            <h1 className="search-heading">Search Results</h1>
            <div className="search-card-container">
              <ul className="post-list-container">
                {searchPostList.map(eachItem => (
                  <PostItemDetails postItem={eachItem} key={eachItem.postId} />
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="no-search-failure-container">
            <img
              src="https://res.cloudinary.com/dgbrmgffm/image/upload/v1675865026/samples/InstaShare%20PNG/Group_udoax3.png"
              alt="search not found"
              className="no-search-view-img"
            />
            <h1 className="no-search-title">Search Not Found</h1>
            <p className="no-search-text">
              Try different keyword or search again
            </p>
          </div>
        )}
      </>
    )
  }

  renderSearchSection = () => {
    const {searchStatus} = this.state
    let searchMode

    switch (searchStatus) {
      case status.initial:
        searchMode = this.renderLoading()
        break
      case status.success:
        searchMode = this.renderSearchCaption()
        break
      case status.failed:
        searchMode = this.renderSearchFailureView()
        break
      default:
        break
    }
    return searchMode
  }

  render() {
    const {isSearched} = this.state
    return (
      <div className="profilePage-container">
        <div className="lg-header">
          <Header
            onClickedSearchBar={this.onClickedSearchBar}
            onChangeSearchStatus={this.onChangeSearchStatus}
            selectedRoute={isSearched === false ? 'my-Profile' : undefined}
          />
        </div>
        <div className="sm-header">
          <SmHeader
            onClickedSearchBar={this.onClickedSearchBar}
            onChangeSearchStatus={this.onChangeSearchStatus}
            selectedRoute={isSearched === false ? 'my-Profile' : 'Search'}
          />
        </div>
        <div className="profile-section-container">
          <div className="profile-content-container">
            {isSearched === false
              ? this.renderProfileSection()
              : this.renderSearchSection()}
          </div>
        </div>
      </div>
    )
  }
}
export default MyProfile
