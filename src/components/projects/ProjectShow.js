import React from 'react'
import axios from 'axios'
import debounce from 'lodash/debounce'
import Textarea from 'react-textarea-autosize'

import PackageIndex from '../packages/PackageIndex'
import TimeStamp from './TimeStamp'
import UserInfo from './UserInfo'
import ProjectVisibility from './ProjectVisibility'
import PackageBox from './PackageBox'
import InstalledPackageIndex from '../packages/InstalledPackageIndex'
import PackageShow from '../packages/PackageShow'

import CommentCard from '../common/CommentCard'
import CommentInput from '../common/CommentInput'

import Auth from '../../lib/Auth'


class ProjectShow extends React.Component {
  constructor() {
    super()

    this.state = {
      selectedPackage: null,
      error: null,
      tab: 'search'
    }

    this.delayedCallback = debounce(this.putProject, 1000)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleTabClick = this.handleTabClick.bind(this)
    this.handleTagClick = this.handleTagClick.bind(this)
    this.handleViewClick = this.handleViewClick.bind(this)
    this.handlePackageDelete = this.handlePackageDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getProject = this.getProject.bind(this)
  }


  getProject() {
    axios.get(`/api/projects/${this.props.match.params.id}`)
      .then(res => this.setState({ project: res.data }))
  }

  componentDidMount() {
    this.getProject()
  }

  componentDidUpdate(prevProps) {
    if(this.props.location.pathname !== prevProps.location.pathname) {
      this.getProject()
    }
  }

  putProject() {
    axios.put(`/api/projects/${this.props.match.params.id}`,
      {...this.state.project},
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`
        }
      })
      .then(res => console.log(res.data))
      .catch( err => console.log(err.errors))
  }

  handleViewClick(_package){

    this.setState({ selectedPackage: _package })
    setTimeout(function () {
      document.getElementById('package-show').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
    }, 100)
  }

  handleAddClick(_package) {
    const index = this.state.project.packages.indexOf(_package)
    const packages = (index === -1) ? (
      this.setState({editing: true}),
      this.state.project.packages.concat(_package)
    ) : (
      this.state.project.packages
    )

    const project = {...this.state.project, packages }
    this.setState({ project })
    this.delayedCallback()
  }

  handleTabClick(e, val){
    {this.setState({tab: val})}
  }

  handleTagClick(_package){
    this.setState({ selectedPackage: _package, tab: 'installed' })
    setTimeout(function () {
      if (document.getElementById(_package.name) && document.getElementById('package-show')) {
        document.getElementById(_package.name).classList.add('glow')
        document.getElementById('package-show').scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'})
      }
    }, 100)
    setTimeout(function () {
      const el = document.getElementById(_package.name)

      if (el) el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'})
      setTimeout(function () {
        if(el) el.classList.remove('glow')
      }, 1000)
    }, 500)
  }

  handlePackageDelete(_package) {
    const index = this.state.project.packages.indexOf(_package)

    const packages = (index !== -1) ? (
      this.setState({editing: true}),
      [
        ...this.state.project.packages.slice(0, index),
        ...this.state.project.packages.slice(index+1)
      ]
    ) : (
      this.state.project.packages

    )

    const project = {...this.state.project, packages }
    this.setState({ project })
    this.delayedCallback()
  }

  handleChange({ target: { name, value } }) {
    const _value = name === 'visible' ? !this.state.project.visible : value
    const project = {...this.state.project, [name]: _value }
    const errors = {...this.state.errors, [name]: null }
    this.setState({ project, errors, editing: true })
    this.delayedCallback()
  }


  render() {
    if(!this.state.project) return (
      <section className="section">
        <div className="container">
          <h4 className="title is-4">Loading...</h4>
        </div>
      </section>
    )
    const { name, description, createdAt, updatedAt, packages, user, visible, comments, _id } = this.state.project
    const loggedIn = Auth.checkAvailability(user._id)
    return(
      <section className="section">
        <div className="container is-fluid">
          <div className="columns scroll">
            <div className="column is-half project">
              <input
                autoComplete="off"
                className="title is-1 input hidden-input"
                placeholder="Name is required"
                name="name"
                onChange={this.handleChange}
                value={name}
                readOnly={!loggedIn}
              />
              <Textarea
                className="textarea hidden-input"
                name="description"
                placeholder="description"
                onChange={this.handleChange}
                value={description}
                readOnly={!loggedIn}
              />
              <PackageBox
                loggedIn={loggedIn}
                handleTagClick={this.handleTagClick}
                handlePackageDelete={this.handlePackageDelete}
                packages={packages} />
              <ProjectVisibility visible={visible} handleChange={this.handleChange} loggedIn={loggedIn}/>
              <hr />
              {!loggedIn &&
                <UserInfo user={user} />
              }
              <TimeStamp createdAt={createdAt} updatedAt={updatedAt}/ >
            </div>
            <div className="column is-half package-column">
              <div className="card is-fullheight">
                <div id="package-index" className="tabs is-boxed">
                  <ul>
                    {loggedIn &&<li className={this.state.tab==='search'? 'is-active': ''} ref={el => this.searchTab = el} onClick={(e)=>this.handleTabClick(e,'search')} >
                      <a>Search</a>
                    </li>}
                    <li className={this.state.tab==='installed'? 'is-active': ''} ref={el => this.installedTab = el} onClick={(e)=>this.handleTabClick(e,'installed')} >
                      <a className='level'>
                        <div className='level-item'>Installed</div>
                        <div className='level-right'>
                          <div className="level-item tag is-info">{packages.length}</div>
                        </div>
                      </a>
                    </li>
                    <li
                      className={this.state.tab==='comments'? 'is-active': ''}
                      ref={el => this.commentTab = el}
                      onClick={(e)=>this.handleTabClick(e,'comments')}
                    >
                      <a className='level'>
                        <div className='level-item'>Comments</div>
                        <div className='level-right'>
                          <div className="level-item tag is-info">{comments.length}</div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-content">
                  {(this.state.tab==='comments')&&
                  <div className="">
                    {Auth.isAuthenticated()&&
                      <CommentInput
                        postCommentUrl={`/api/projects/${_id}/comments`}
                        updateThread={this.getProject}
                      />}
                    {comments.map((comment, i)=>
                      <CommentCard key={i} comment={comment} />
                    )}
                  </div>}
                  {(this.state.tab==='installed')&&
                  <InstalledPackageIndex
                    handleAddClick={this.handleAddClick}
                    packages={packages}
                    handleViewClick={this.handleViewClick}
                    userId = {this.state.project.user._id}/>}
                  {(this.state.tab==='search')&&
                  <PackageIndex
                    handleAddClick={this.handleAddClick}
                    packages={this.state.project.packages}
                    handleViewClick={this.handleViewClick}
                    userId = {this.state.project.user._id}/>}
                </div>
              </div>
            </div>
            {this.state.selectedPackage && <div id="package-show" className="column is-half">
              <PackageShow
                selectedPackage={this.state.selectedPackage}
              />
            </div>}
          </div>
        </div>
      </section>
    )
  }
}

export default ProjectShow
