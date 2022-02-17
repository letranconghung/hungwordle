import React from 'react'

const GraphicStats = (props) => {
  const {value, times, percent} = props
  return (
    <div className="flex pb-1">
      <span className="flex-none mr-3">{value}</span>
      <div className="flex-grow relative bg-gray-600">
        <div className="bg-red-700 h-full"></div>
      </div>
    </div>
  )
}

export default GraphicStats