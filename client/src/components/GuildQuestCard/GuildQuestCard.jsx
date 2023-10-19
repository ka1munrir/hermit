import React from 'react'
import questPosting from '../../assets/questPosting.png'
import '../GuildQuestCard/GuildQuestCard.css'

function QuestCard({ quest }) {
  const { description, title, genre, difficulty, city, age_restriction, imgURL } = quest

  return (
    <div className='questCard-div'>
      {/* <img src={imgURL} alt={`${title} Image`} /> */}
      <div style={{ backgroundImage: `url(\"${imgURL}\")` }} className='image'></div>
      <h1>{title}</h1>
      {/* <div className='guilds-info'>
        <p>{description}</p>
        <p>{genre}</p>
        <p>{difficulty}</p>
        <p>{city}</p>
        <p>{age_restriction}</p>
      </div> */}
    </div>
  )
}

export default QuestCard