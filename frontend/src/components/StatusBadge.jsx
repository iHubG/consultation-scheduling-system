import React from 'react'

const StatusBadge = ({ status }) => {
  let classes = 'px-3 py-1 rounded-full text-sm font-medium '

  switch (status) {
    case 'Approved':
      classes += 'bg-green-100 text-green-700'
      break
    case 'Rejected':
      classes += 'bg-red-100 text-red-700'
      break
    default:
      classes += 'bg-yellow-100 text-yellow-700'
  }

  return <span className={classes}>{status}</span>
}

export default StatusBadge
