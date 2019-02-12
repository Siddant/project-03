import React from 'react'


const UsersProfile  = ({ username, email, bio, image}) =>  {

  return(
    <div className="field" >
      <img className="image profile" src={image || 'http://interreligio.unistra.fr/wp-content/uploads/2017/07/profil-vide.png'} alt={`image of user ${username}`} />
      <h1>User name: {username}</h1>
      <p>Email: {email}</p>
      <p>{bio}</p>
      <div className="field">
        <button className="button is-primary home-button" >Edit Profile</button>
      </div>
    </div>

  )
}

export default UsersProfile
