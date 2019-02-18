import React from 'react'
import RegisterForm from './auth/RegisterForm'
import LoginForm from './auth/LoginForm'
import axios from 'axios'
import Auth from '../lib/Auth'
import Flash from '../lib/Flash'


class Home extends React.Component{

  constructor(){
    super()
    this.state = {
      data: {},
      register: true,
      error: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeState = this.changeState.bind(this)

  }

  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: null }
    this.setState({ data, errors })
  }

  registerFunction(){
    axios
      .post('api/register', this.state.data)
      .then(res => {
        Flash.setMessage('success', res.data.message)
        this.setState({...this.state,  data: {}, register: false})
        this.props.history.push('/')
      })
      .catch(err =>this.setState({...this.state, error: err.response.data }))
  }

  changeState(){
    this.setState({...this.state, register: !this.state.register })
  }

  handleSubmit(e){
    e.preventDefault(e)
    const command = e.target.name
    if(command === 'register' ) this.registerFunction()
    else this.loginFunction()
  }

  componentDidMount(){
    this.setState({...this.state, register: this.props.register })
  }

  render(){
    console.log(Auth.isAuthenticated())
    const authenticated = Auth.isAuthenticated()
    if (!authenticated) {
      return(
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half authorisation">
                <div className="title is-1">Pepino</div>
                <h2  className="title is-2">Built for developers</h2>
                <div  className="homeText">If you want to manage your projects, see what packages are out there and find out what other users are doing.</div>
                <div  className="homeText">
                Connect with other developers, Explore all possibilities.
                </div>
                <div  className="homeText">
                  Join Today.
                </div>
              </div>
              <div className="column is-half  authorisation">
                {this.state.register &&  <RegisterForm
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  data={this.state.data}
                  errors={this.state.error}
                  changeState={this.changeState}
                />}
                {!this.state.register && <LoginForm
                  handleSubmit={(e)=>this.props.handleLogin(e, this.state.data)}
                  handleChange={this.handleChange}
                  data={this.state.data}
                  changeState={this.changeState}
                  errors={this.props.error}
                />}
              </div>
            </div>
          </div>
        </section>
      )
    }
    if (authenticated) {
      return (
        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half authorisation">
                <div className="title is-1">Pepino</div>
                <h2  className="title is-2">Built for developers</h2>
                <div  className="homeText">If you want to manage your projects, see what packages are out there and find out what other users are doing.</div>
                <div  className="homeText">
                Connect with other developers, Explore all possibilities.
                </div>
                <div  className="homeText">
                  Join Today.
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }
  }
}

export default Home
