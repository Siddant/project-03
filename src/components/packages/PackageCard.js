import React from 'react'
import Auth from '../../lib/Auth'

class PackageCard extends React.Component{

  render(){
    const { name, icon, version, comments, score, description, keywords, _id } = this.props.package
    return(
      <div id={name} className='card'>
        <div className='card-header'>
          <div className="media">
            <div className="media-left">
              {icon &&<div className="">
                <div className="comment-image level-item">
                  <figure className="image" style={{ backgroundImage: `url(${icon})` }} />
                </div>
              </div>}
            </div>
            <div className="media-content">
              <p className="title is-4">{name}</p>
              <p className="subtitle is-6">{version}</p>
            </div>
          </div>
        </div>
        <div className='card-content'>
          <div className="field is-grouped is-grouped-multiline">
            <div className="control">
              <div className="tags has-addons">
                <span className="tag is-dark">version</span>
                <span className="tag is-info">{version}</span>
              </div>
            </div>
            {comments && <div className="control">
              <div className="tags has-addons">
                <span className="tag is-dark">comments</span>
                <span className="tag is-success">{comments.length}</span>
              </div>
            </div>}
            {!comments && <div className="control">
              <div className="tags has-addons">
                <span className="tag is-dark">comments</span>
                <span className="tag is-success">0</span>
              </div>
            </div>}
            <div className="control">
              <div className="tags has-addons">
                <span className="tag is-dark">score</span>
                <span className="tag is-warning">{parseInt(score*100)}</span>
              </div>
            </div>
          </div>
          <div className='content'><blockquote className='is-medium'>{description}</blockquote></div>
          {keywords && <div className="tags level-item " >{keywords.map( (keyword,j)=> <div key={j} onClick={()=>this.props.handleKeywordClick(keyword)}className="tag is-primary">{keyword}</div>)}</div>}
        </div>
        <div className="card-footer">
          <div className="card-footer-item buttons has-addons is-fullwidth">
            <button
              className="button is-success is-skew "
              name="package"
              value={_id}
              onClick={() => this.props.handleAddClick(this.props.package)}
              disabled={!Auth.checkAvailability(this.props.userId) || this.props.getUsedPackagesIds().includes(_id)}
            >
              +Add to project
            </button>
            <button
              className="button is-info is-skew"
              name='viewPackage'
              value={_id}
              onClick={() => this.props.handleViewClick(this.props.package)}
            >
            View Details
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default PackageCard
