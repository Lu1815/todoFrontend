import React from 'react'
import { Oval } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
        <Oval type="Puff" color="#00BFFF" height={550} width={80} />
    </div>
  )
}

export default Loading