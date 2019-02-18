import React from 'react'

const ProjectVisibility = ({visible, handleChange, loggedIn}) => {
  return (
    <section className="section visible">
      <div className="control">
        <strong>View Public</strong>
        <label className="switch">
          <input
            type="checkbox"
            name="visible"
            checked={JSON.parse(visible)=== true}
            onChange={handleChange}
            disabled={!loggedIn}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </section>
  )
}

export default ProjectVisibility
