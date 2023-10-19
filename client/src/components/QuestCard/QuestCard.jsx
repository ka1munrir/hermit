import React from 'react'
import questPosting from '../../assets/questPosting.png'
import './QuestCard.css'

function QuestCard({quest}) {
  const { title, imgURL } = quest
  return (
    <div className='questCard-div'>
      {/* <img src={imgURL} alt={`${title} Image`} /> */}
      <div style={{backgroundImage: `url(\"${imgURL}\")`}} className='image'></div>
      <h1>{title}</h1>
    </div>
  )
}

export default QuestCard