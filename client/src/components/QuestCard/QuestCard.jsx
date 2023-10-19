import React from 'react'
import Popup from 'reactjs-popup';

import './QuestCard.css'

function QuestCard({quest}) {
  const { title, imgURL } = quest
  return (
      <Popup trigger=
          {
            <div className='questCard-div'>
              <div style={{backgroundImage: `url(\"${imgURL}\")`}} className='image'></div>
              <h1>{title}</h1>
            </div>
          } 
          modal nested>
          {
              close => (
                <div className='questCardPopUp-div'>
                <div style={{backgroundImage: `url(\"${imgURL}\")`}} className='imagePopUp'></div>
                <h1>{title}</h1>
              </div>
              )
          }
      </Popup>
  )
}

export default QuestCard