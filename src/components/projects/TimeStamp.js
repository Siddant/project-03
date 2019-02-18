import React from 'react'
const TimeStamp = ({createdAt, updatedAt}) => {
  return (
    <div className="columns scroll timeStamp">
      <div className="column createdAt">Created at: {createdAt.split('T')[0]} </div>
      <div className="column updatedAt">Updated at: {updatedAt.split('T')[0]}</div>
    </div>
  )
}

export default TimeStamp
