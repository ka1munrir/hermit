import React from 'react'
import questPosting from '../../assets/questPosting.png'
import './QuestCard.css'

function QuestCard({ quest }) {
  const { title } = quest
  return (
    <div className='questCard-div'>

      <p>{title}</p>
      {/* <p>{description}</p>
      <p>{genre}</p>
      <p>{difficulty}</p>
      <p>{city}</p>
      <p>{age_restriction}</p> */}


    </div>
  )
}

export default QuestCard