import React from 'react'
import { useParams } from 'react-router-dom'

const Algo_page = () => {
    const{id}=useParams();

  return (
    <div>{id}</div>
  )
}

export default Algo_page