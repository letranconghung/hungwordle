import React from 'react'

const NumericStats = (props) => {
  const {value, caption} = props
  return (
    <div className='mx-5'>
      <h3 className='text-5xl font-bold mb-1'>{value}</h3>
      <h3 className='text-sm font-extralight w-max'>{caption}</h3>
    </div>
  )
}

export default NumericStats