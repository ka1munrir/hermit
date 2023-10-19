import {React, useState, useEffect} from 'react'
import '../dashboard/Dashboard.css'
import QuestCard from '../../components/QuestCard/QuestCard'
import useUserStore from "../../hooks/userStore";

function Dashboard() {
  const {user} = useUserStore()
  const [userQuests, setUserQuests] = useState([])
  const{first_name, last_name, username} = user
  const [showProfile, setShowProfile] = useState(true)
  const [image, setImage] = useState("https://thispersondoesnotexist.com/")
  const [ title, setTitle] = useState(`${first_name} ${last_name}`)
  const [content, setContent] = useState("")

  useEffect(() => {
    fetch(`/api/users/${user.id}/userquests`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUserQuests(data)
      });
  }, []);

  const profileSidebar = (
    <>
      <h2>{`@${username}`}</h2>
      <div>
        <div>
          <h4></h4>
          <p></p>
        </div>
        <div>
          <h4></h4>
          <p></p>
        </div>
        <div>
          <h4></h4>
          <p></p>
        </div>
        <div>
          <h4></h4>
          <p></p>
        </div>
      </div>
    </>
  )
  const questSidebar = (
    <p id='questDesc'>{content}</p>
  )
  return (
    <div className='dash-div'>
      <div className='questsTaken-div'>
        <div className='title-div'>
          <h1>Quests</h1>
        </div>
        <div className='questsTakenContainer'>
            <QuestCard quest={{title:"Cherry Cricket", imgURL:"https://wp-denverite.s3.amazonaws.com/wp-content/uploads/sites/4/2017/04/170411-CHERRY-CRICKET-KEVINJBEATY-11.jpg"}}/>
        </div>
        <div>

        </div>
      </div>
      <div className='sideBar-div'>
        <img src={image} alt={`${title} Image`} id='sideBarImg'/>
        <h1>{title}</h1>
        {
          
        }
      </div>
    </div>
  )
}

export default Dashboard