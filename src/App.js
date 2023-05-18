import './App.css'

import {Component} from 'react'

import {v4} from 'uuid'

import Passwords from './components/Passwords'

class App extends Component {
  state = {
    passwordsList: [],
    website: ' ',
    username: '',
    password: '',
    showPassword: true,
    isPasswords: false,
    count: 0,
    searchValue: '',
    initialList: [],
  }

  toAdd = event => {
    event.preventDefault()

    const {website, username, password} = this.state
    const newList = {id: v4(), website, username, password}
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newList],
      initialList: [...prevState.initialList, newList],
      isPasswords: true,
      website: '',
      username: '',
      password: '',
      count: prevState.count + 1,
    }))
  }

  tickButton = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  toDelete = id => {
    const {passwordsList} = this.state
    const filteredList = passwordsList.filter(each => each.id !== id)

    if (filteredList.length === 0) {
      this.setState({isPasswords: false, count: 0})
    }
    this.setState(prevState => ({
      passwordsList: filteredList,
      count: prevState.count - 1,
      initialList: filteredList,
    }))
  }

  changeWebsite = event => {
    this.setState({website: event.target.value})
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  changeSearch = event => {
    console.log(event.target.value)
    const {passwordsList, initialList} = this.state
    let searchList = initialList

    if (event.target.value !== '') {
      searchList = passwordsList.filter(each =>
        each.website.toLowerCase().includes(event.target.value.toLowerCase()),
      )
      if (searchList.length === 0) {
        this.setState({isPasswords: false, count: 0})
      } else {
        this.setState({isPasswords: true, count: searchList.length})
      }
      this.setState({
        passwordsList: searchList,
        searchValue: event.target.value,
      })
    } else {
      this.setState({
        passwordsList: searchList,
        searchValue: event.target.value,
        isPasswords: true,
        count: searchList.length,
      })
    }
  }

  render() {
    const {
      website,
      username,
      password,
      passwordsList,
      isPasswords,
      showPassword,
      count,
      searchValue,
    } = this.state

    const tickButton = showPassword ? 'normalButton' : 'backGroundButton'
    return (
      <div className="mainSection">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="appLogo"
        />
        <div className="section1">
          <form className="formSection" onSubmit={this.toAdd}>
            <h1 className="heading1">Add New Password</h1>
            <div className="inputSection">
              <div className="inputImageSection">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website"
                />
              </div>
              <input
                type="text"
                className="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.changeWebsite}
              />
            </div>
            <div className="inputSection">
              <div className="inputImageSection">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website"
                />
              </div>
              <input
                type="text"
                className="text"
                placeholder="Enter Username"
                value={username}
                onChange={this.changeUsername}
              />
            </div>
            <div className="inputSection">
              <div className="inputImageSection">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="website"
                />
              </div>
              <input
                type="password"
                className="text"
                placeholder="Enter Password"
                value={password}
                onChange={this.changePassword}
              />
            </div>
            <button className="Add" type="submit">
              Add
            </button>
          </form>

          <img
            className="passwordManager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png "
            alt="password manager"
          />
        </div>

        <div className="section2">
          <div className="headingSection">
            <div className="countSection">
              <h1 className="password">Your Passwords</h1>
              <p className="count">{count}</p>
            </div>

            <div className="searchSection">
              <div className="searchImageSection">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="searchImage"
                />
              </div>
              <input
                value={searchValue}
                className="search"
                placeholder="search"
                type="search"
                onChange={this.changeSearch}
              />
            </div>
          </div>
          <hr />
          <div className="tickButtonSection">
            <input
              onClick={this.tickButton}
              type="checkbox"
              className={tickButton}
              id="showPassword"
            />
            <label htmlFor="showPassword" className="showPassword">
              Show Passwords
            </label>
          </div>
          {isPasswords ? (
            <ul>
              {passwordsList.map(each => (
                <Passwords
                  details={each}
                  key={each.id}
                  deleteDetails={this.toDelete}
                  toShowPassword={showPassword}
                />
              ))}
            </ul>
          ) : (
            <div className="noPasswordSection">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                alt="no passwords"
                className="noPasswordImage"
              />
              <p className="noPassword">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
