import React from 'react'
import { IMG_CDN } from '../utils/constants'

const MovieCards = ({poster_path}) => {
  return (
    <div className="w-36 md:w-48 pr-4">
     <img alt='Movie Card' src={IMG_CDN + poster_path}/>
    </div>
  )
}

export default MovieCards
