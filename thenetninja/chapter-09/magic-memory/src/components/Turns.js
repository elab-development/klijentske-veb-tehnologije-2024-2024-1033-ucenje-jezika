import React from 'react'
import './Turns.css'

export default function Turns( {turns} ) {
  return (
    <div className='turns'>
      <p>Turns: {turns}</p>
    </div>
  )
}
