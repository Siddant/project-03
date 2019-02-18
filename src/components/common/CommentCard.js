import React from 'react'

const CommentCard = (props)=> {
  const  {text, user, createdAt} = props.comment
  let date = new Date(createdAt)
  date = date.toLocaleString()
  return(
    <div className="card">
      <div className="card-content">

        <div className="media">
          <div className="media-right">
            <div className="level">
              <div className="comment-image">
                <figure className="image" style={{ backgroundImage: `url(${user.image})` }} />
              </div>
              <p className="title is-4">{user.username}</p>
            </div>
          </div>
          <div className="media-content">
            <time dateTime={createdAt} className="level-item subtitle is-6 date">{date}</time>
          </div>
        </div>
        <hr/>
        <div className="content comment-card">
          <p className="title is-6">{text}</p>

        </div>

      </div>
    </div>
  )
}

export default CommentCard
