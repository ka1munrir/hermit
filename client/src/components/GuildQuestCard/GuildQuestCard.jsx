import React from 'react'
import Popup from 'reactjs-popup';
import '../GuildQuestCard/GuildQuestCard.css'

function QuestCard({ quest }) {
  const { description, title, genre, difficulty, city, age_restriction, imgURL } = quest

  return (
    <Popup trigger=
      {
        <div className='questCard-div'>
          <div style={{ backgroundImage: `url(\"${imgURL}\")` }} className='image'></div>
          <h1>{title}</h1>
        </div>
      }
      modal nested>
      {
        close => (
          <div className='popup-div'>
            <div className='questCardPopUp-div'>
              <div style={{ backgroundImage: `url(\"${imgURL}\")` }} className='imagePopUp'></div>
              <p>{title}</p>
              <p>{description}</p>
              <p>{genre}</p>
              <p>{difficulty}</p>
              <p>{city}</p>
              <p>{age_restriction}</p>
            </div>
          </div>
        )
      }
    </Popup>
  )
}

export default QuestCard