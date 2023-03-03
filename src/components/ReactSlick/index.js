import {Component} from 'react'
import Slider from 'react-slick'

import GlobalStyle from './SlickStyle'

import './index.css'

import RouteContext from '../../Context/RouteContext'

const settings = {
  dots: false,
  infinite: false,
  speed: 600,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 358,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlick extends Component {
  renderSlider = () => {
    const {userStoryArray} = this.props

    return (
      <RouteContext.Consumer>
        {value => {
          const {isDarkMode} = value

          const picCardBg = isDarkMode ? 'slick-dark-mode-pic-card' : null

          const darkModeText = isDarkMode ? 'slick-dark-mode-text' : null

          return (
            <>
              <GlobalStyle isDark={isDarkMode} />
              <Slider {...settings}>
                {userStoryArray.map(eachLogo => {
                  const {storyUrl, userID, userName} = eachLogo
                  return (
                    <div className="slick-item" key={userID}>
                      <div className={`story-pic-card ${picCardBg}`}>
                        <img
                          className="logo-image"
                          src={storyUrl}
                          alt="user story"
                        />
                      </div>
                      <p className={`story-user-name ${darkModeText}`}>
                        {userName}
                      </p>
                    </div>
                  )
                })}
              </Slider>
            </>
          )
        }}
      </RouteContext.Consumer>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default ReactSlick
