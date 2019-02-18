import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({data}) => {

  const {
    bio,
    image,
    project,
    username,
    _id
  } = data

  const comments = project.reduce((acc, el)=>acc += el.comments.length,0)
  return(
    <div className="card projectCard">
      <Link to={`/users/${_id}`}>
        <div className="card-header">
          <h4 className="card-header-title">
            <div className="user-card-image">
              <figure className="image" style={{ backgroundImage: `url(${image})` }} />
            </div>
            <div className="username title is-2">{username && username.length > 23 ? username.substr(0, 23) + '...' : username}</div>
          </h4>
        </div>
      </Link>
      <div className="card-content">
        <div className="columns">
          <div className="column content">
            <blockquote className="description">{bio}</blockquote>
          </div>
          <div className="column content">
            <div className="field is-grouped is-grouped-multiline">
              <div className="control is-fullwidth">
                <div className="tags has-addons">
                  <span className="tag is-half is-dark">projects</span>
                  <span className="tag is-half is-info">{project?project.length:0}</span>
                </div>
                <div className="tags has-addons">
                  <span className="tag is-half is-dark">comments</span>
                  <span className="tag is-half is-warning">{comments}</span>
                </div>
                {project[0]&&<div className="tags has-addons">
                  <span className="tag is-half is-dark">latest</span>
                  <Link className="tag is-half is-success card-footer-item" to={`/projects/${project[0]._id}`}>{project[project.length-1].name}</Link>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
