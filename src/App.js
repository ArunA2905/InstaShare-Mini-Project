import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
// eslint-disable-next-line import/extensions
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import RouteContext from './Context/RouteContext'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import PageNotFound from './components/PageNotFound'

import './App.css'

class App extends Component {
  state = {
    searchCaption: '',
    isDarkMode: false,
  }

  onChangeSearchCaption = value => {
    this.setState({searchCaption: value})
  }

  onChangeDarkMode = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
    }))
  }

  render() {
    const {searchCaption, isDarkMode} = this.state
    return (
      <RouteContext.Provider
        value={{
          searchCaption,
          isDarkMode,
          onChangeDarkMode: this.onChangeDarkMode,
          onChangeSearchCaption: this.onChangeSearchCaption,
        }}
      >
        <Switch>
          <Route path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <Route exact path="/bad-path" component={PageNotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </RouteContext.Provider>
    )
  }
}

export default App
