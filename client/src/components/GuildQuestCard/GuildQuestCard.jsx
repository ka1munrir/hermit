import React from 'react'
import Popup from 'reactjs-popup';
import '../GuildQuestCard/GuildQuestCard.css'
import useUserStore from "../../hooks/userStore";

function QuestCard({ quest }) {
  const { id, description, title, genre, difficulty, city, age_restriction, imgURL } = quest
  const { user } = useUserStore()
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
          <div id='guildQuestCardPopUp-div'>
            <div style={{ backgroundImage: `url(\"${title}\")` }} id='userQuestCardImagePopUp'></div>
            <h1>{title}</h1>
            <div id='topGuildQuestDetails'>
              <p className='guildQuestDetails'>{`Age: ${age_restriction}+`}</p>
              <p className='guildQuestDetails'>{`Difficulty: ${difficulty}`}</p>
              <p className='guildQuestDetails'>{`City: ${city}`}</p>
            </div>
            <p className='guildQuestDetails'>{`Guild: ${genre}`}</p>
            <p className='guildQuestDetails'>{description}</p>
            <button onClick={() => {
              fetch('/api/userquests', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "user_id": user.id,
                  "quest_id": id,
                  "last_given": 0,
                  "status": 'Not Started'
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
                })
                .catch(error => {
                  console.log("error", error.message);
                });
            }}>Embark on the quest?</button>
            {/* <select name="status" id="statusSelector" defaultValue={status} onChange={(e) => changeStatus(e.target.value)}>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Forsaken">Forsaken</option>
            </select> */}
          </div>
        )
      }
    </Popup>
  )
}

export default QuestCard