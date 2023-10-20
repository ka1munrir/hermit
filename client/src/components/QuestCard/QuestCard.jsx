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
            <div id='userQuestCard-div'>
              <div style={{backgroundImage: `url(\"${title}\")`}} id='userQuestCardImage'></div>
              <h1 id='userQuestCardTitle'>{title}</h1>
            </div>
          } 
          modal nested>
          {
              close => (
                <div id='userQuestCardPopUp-div'>
                <div style={{backgroundImage: `url(\"${title}\")`}} id='userQuestCardImagePopUp'></div>
                <h1>{title}</h1>
                <div id='topUserQuestDetails'>
                  <p className='userQuestDetails'>{`Age: ${age_restriction}+`}</p>
                  <p className='userQuestDetails'>{`Difficulty: ${difficulty}`}</p>
                  <p className='userQuestDetails'>{`City: ${city}`}</p>
                </div>
                <p className='userQuestDetails'>{`Guild: ${genre}`}</p>
                <p className='userQuestDetails'>{description}</p>
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