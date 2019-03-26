import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'

import Header from './components/common/Header'
import PackageShow from './components/packages/PackageShow'
import ProjectShow from './components/projects/ProjectShow'
import ProjectsIndex from './components/projects/ProjectsIndex'
import PackageIndex from './components/packages/PackageIndex'

import FlashMessages from './components/common/FlashMessages'

import Home from './components/Home'
import UsersShow from './components/users/UsersShow'
import UsersIndex from './components/users/UsersIndex'
import Auth from './lib/Auth'
import Flash from './lib/Flash'

// import 'bulma'
import './scss/style.scss'
import axios from 'axios'

class App extends React.Component {

  constructor(){
    super()
    this.state={
      user: null,
      register: true,
      error: {}
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.handleLogin = this.handleLogin.bind(this)

  }

  componentDidMount(){
    this.setState({redirection: null})
    if(Auth.getUserID()){
      axios.get(`/api/users/${Auth.getUserID()}`)
        .then( res =>{
          this.setState({ user: res.data})
        })
        .catch((err)=>console.log(err.message))
    }
  }

  componentDidUpdate(){
    if(this.state.redirection) this.setState({redirection: null})
  }

  handleLogout(){
    Auth.removeToken()
    this.setState({
      user: null,
      redirection: '/',
      loggedIn: false
    })
  }

  handleLogin(e,data){
    e.preventDefault(e)
    axios
      .post('api/login', data)
      .then(res => {
        Auth.setToken(res.data.token)
        Flash.setMessage('success', res.data.message)
      })
      .then(() => {
        return axios.get(`/api/users/${Auth.getUserID()}`)
      })
      .then((res) =>{
        this.setState({
          user: res.data,
          redirection: `/users/${Auth.getUserID()}`
        })
      })
      .catch(err =>this.setState({...this.state, error: err.response.data, register: false }))
  }

  render(){
    const _Home = props => <Home handleLogin={this.handleLogin} error={this.state.error} register={this.state.register} {...props}/>

    return(
      <BrowserRouter>
        <main>
          {(this.state.redirection) && <Redirect push to={this.state.redirection} />}
          <Header
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
          <FlashMessages />

          <Switch>
            <Route path="/projects/:id" component={ProjectShow} />
            <Route path="/projects" component={ProjectsIndex} />
            <Route path="/packages/:name" component={PackageShow} />
            <Route path="/packages" component={PackageIndex} />
            <Route path="/users/:id" component={UsersShow} />
            <Route path="/users" component={UsersIndex} />
            <Route path="/" handleLogin={this.handleLogin} component={_Home} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
