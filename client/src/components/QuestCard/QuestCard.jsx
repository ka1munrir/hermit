import React from 'react'
import Popup from 'reactjs-popup';

import './QuestCard.css'

function QuestCard({ setUserQuests, userQuests, userQuest}) {
  const {id, status, quest_rel} = userQuest;
  const {title, genre, description, difficulty, age_restriction, city } = quest_rel

  const changeStatus = (status) => {
    fetch(`/api/userquests/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: status
      })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response error");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        userQuest.status = status;
        setUserQuests([...userQuests.filter(uQuest => uQuest.id !== id), userQuest]);
    })
    .catch(error => {
        console.log("error", error.message);
    });
  }

  return (
      <Popup trigger=
          {
            <div className='questCard-div'>
              <div style={{backgroundImage: `url(\"${title}\")`}} className='image'></div>
              <h1>{title}</h1>
            </div>
          } 
          modal nested>
          {
              close => (
                <div className='questCardPopUp-div'>
                <div style={{backgroundImage: `url(\"${title}\")`}} className='imagePopUp'></div>
                <h1>{title}</h1>
                <div className='topQuestDetails'>
                  <p className='questDetails'>{`Age: ${age_restriction}+`}</p>
                  <p className='questDetails'>{`Difficulty: ${difficulty}`}</p>
                  <p className='questDetails'>{`City: ${city}`}</p>
                </div>
                <p className='questDetails'>{`Guild: ${genre}`}</p>
                <p className='questDetails'>{description}</p>
                <select name="status" id="statusSelector" defaultValue={status} onChange={(e) => changeStatus(e.target.value)}>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Forsaken">Forsaken</option>
                </select>
              </div>
              )
          }
      </Popup>
  )
}

export default QuestCard