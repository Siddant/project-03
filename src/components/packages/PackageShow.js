import React from 'react'

import axios from 'axios'

import CommentCard from '../common/CommentCard'
import CommentInput from '../common/CommentInput'

import Auth from '../../lib/Auth'


class PackageShow extends React.Component{

  constructor(){
    super()
    this.state = {
      tab: 'about',
      package: null
    }

    this.handleClick = this.handleClick.bind(this)
    this.getPackageData = this.getPackageData.bind(this)

  }

  getPackageData(){
    axios.get(`/api/packages/${this.props.selectedPackage.name}`)
      .then( res =>{
        this.setState({ package: res.data})
      })
      .catch((err)=>console.log(err.message))
  }

  componentDidMount(){
    // if(this.props.selectedPackage){
    this.getPackageData()
    // }
  }

  componentDidUpdate(prevProps){
    if(!this.props.selectedPackage) return
    if(!prevProps.selectedPackage)  return this.getPackageData()
    if(this.props.selectedPackage.name === prevProps.selectedPackage.name) return
    this.setState({tab: 'about'})
    this.getPackageData()
  }

  handleClick(e, val){
    {this.setState({tab: val})}
  }

  render(){
    if(!this.state.package) return null
    const {
      name,
      description,
      author,
      links,
      license
    } = this.state.package.npms.collected.metadata
    const {
      forksCount,
      starsCount,
      subscribersCount
    } = this.state.package.npms.collected.github
    const {
      dependentsCount,
      starsCount: npmStarsCount
    } = this.state.package.npms.collected.npm
    const {
      maintenance: {
        commitsFrequency,
        issuesDistribution,
        openIssues,
        releasesFrequency
      },
      popularity:
      {communityInterest, downloadsCount, downloadsAcceleration, dependentsCount: popDependentsCount},
      quality: {
        branding,
        carefulness,
        health,
        tests
      }
    } = this.state.package.npms.evaluation
    const {comments, icon} = this.state.package
    function arrFromObj(obj){
      const arr = []
      for (const key in obj) arr.push([key, obj[key]])
      return arr
    }
    return(
      <div className="card">
        <div className="tabs is-boxed">
          <ul>
            <li
              className={this.state.tab==='about'? 'is-active': ''}
              ref={el => this.aboutTab = el}
              onClick={(e)=>this.handleClick(e,'about')}
            >
              <a> {`About: ${name}`}</a>
            </li>
            <li
              className={this.state.tab==='stats'? 'is-active': ''}
              ref={el => this.statsTab = el}
              onClick={(e)=>this.handleClick(e,'stats')}
            >
              <a>Stats</a>
            </li>
            <li
              className={this.state.tab==='comments'? 'is-active': ''}
              ref={el => this.commentTab = el}
              onClick={(e)=>this.handleClick(e,'comments')}
            >
              <a className='level'>
                <div className='level-item'>Comments</div>
                <div className='level-right'>
                  <div className="level-item tag is-primary">{comments.length}</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        {(this.state.tab==='about')&&<div className="card package-index-card">
          <div className="card-content">
            {icon&&<div className="package-show-image">
              <figure className="image" style={{ backgroundImage: `url(${icon})` }} />
            </div>}
            <p className="subtitle">
              {name}
            </p>
            <p className="title">
              {description}
            </p>
            <hr/>
            {author&&<p className="is-small">
              {`author: ${author.name}`}
            </p>}
            <p className="is-small">
              {`licence: ${license}`}
            </p>
            <hr/>
          </div>
        </div>}
        {(this.state.tab==='stats')&&<div className="card package-index-card">
          <div className="card-content">
            {console.log(this.state.package.npms)}
            <h4 className="title is-6">GitHub</h4>
            <div className="tags has-addons">
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Forks: </span><span className="tag is-primary is-half">{forksCount}</span>
              </p>
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Stars: </span><span className="tag is-primary is-half">{starsCount}</span>
              </p>
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Susbscribers: </span><span className="tag is-primary is-half">{subscribersCount}</span>
              </p>
            </div>
            <hr />
            <h4 className="title is-6">NPM</h4>
            <div className="tags has-addons">
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Dependents: </span><span className="tag is-success is-half">{dependentsCount}</span>
              </p>
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Stars: </span><span className="tag is-success is-half">{npmStarsCount}</span>
              </p>
            </div>
            <hr />
            <h4 className="title is-6">Evaluation</h4>
            <div className="tags has-addons">
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Commits Frequency: </span><span className="tag is-info is-half">{commitsFrequency}</span>
              </p>
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Issues Distribution: </span><span className="tag is-info is-half">{issuesDistribution}</span>
              </p>
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Open Issues: </span><span className="tag is-info is-half">{openIssues}</span>
              </p>
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Releases Frequency: </span><span className="tag is-info is-half">{releasesFrequency}</span>
              </p>
            </div>
            <hr />
            <h4 className="title is-6">Popularity</h4>
            <div className="tags has-addons">
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Community Interest: </span><span className="tag is-warning is-half">{communityInterest}</span>
              </p>
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Downloads Count: </span><span className="tag is-warning is-half">{downloadsCount}</span>
              </p>
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Downloads Acceleration: </span><span className="tag is-warning is-half">{downloadsAcceleration}</span>
              </p>
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Dependents Count: </span><span className="tag is-warning is-half">{popDependentsCount}</span>
              </p>
            </div>
            <hr />
            <h4 className="title is-6">Quality</h4>
            <div className="tags has-addons">
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Branding: </span><span className="tag is-primary is-half">{branding}</span>
              </p>
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Carefulness: </span><span className="tag is-primary is-half">{carefulness}</span>
              </p>
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Health: </span><span className="tag is-primary is-half">{health}</span>
              </p>
              <p className="is-fullwidth">
                <span className="tag is-dark is-half">Tests: </span><span className="tag is-primary is-half">{tests}</span>
              </p>
            </div>
          </div>
        </div>}
        {(this.state.tab==='comments')&&<div className="card-content">
          {Auth.isAuthenticated()&&<CommentInput postCommentUrl={`/api/packages/${name}`} updateThread={this.getPackageData}/>}
          {comments.map((comment, i)=><CommentCard key={i} comment={comment} />)}
        </div>}
        <footer className="card-footer-item">
          {arrFromObj(links).map( (link,i) => {
            return <p key={i} className="card-footer-item">
              <a  href={link[1]}>
                {link[0]}
              </a>
            </p>
          })}
        </footer>
      </div>
    )
  }
}

export default PackageShow
