import React from 'react'

const NumericStats = (props) => {
  const {value, caption} = props
  return (
    <div className='mx-2 sm:mx-5'>
      <h3 className='text-xl sm:text-5xl font-bold mb-1 text-center blackGray'>{value}</h3>
      <h3 className='text-xs sm:text-sm font-extralight w-max mx-auto blackGray'>{caption}</h3>
    </div>
  )
}

export default NumericStats