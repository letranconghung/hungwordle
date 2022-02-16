import React, {useContext} from 'react'
import { GlobalContext } from '../../App'

const NewGameButton = () => {
  const {data, dispatchData} = useContext(GlobalContext)
  return (
    <button className='py-2 px-4 mb-1 rounded bg-slate-500 text-white font-medium' onClick={()=>{
      dispatchData({
        type: "reset"
      })
    }}>
      New Game
    </button>
  )
}

export default NewGameButton