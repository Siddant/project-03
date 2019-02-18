import React from 'react'

const PackageBox = ({ loggedIn, handleTagClick, handlePackageDelete, packages }) => {
  return (
    <section className="box">
      <h2 className='title is-5'>Installed packages</h2>
      {packages.length === 0 && <div className="none">no packages yet</div>}
      <div className="tags">
        {packages.map((_package,i) =>
          <div
            className="tag is-info fade-in"
            key={i}
            id={_package._id}
            onClick={()=> handleTagClick(_package)}
          >
            {_package.name}
            {loggedIn && <button
              className="delete is-small"
              onClick={() => handlePackageDelete(_package)}>
            </button>}
          </div>
        )}
      </div>
    </section>
  )
}

export default PackageBox
