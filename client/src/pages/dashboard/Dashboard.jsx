import {React, useState, useEffect} from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Popup from 'reactjs-popup';
import '../dashboard/Dashboard.css'
import QuestCard from '../../components/QuestCard/QuestCard'
import useUserStore from "../../hooks/userStore";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const {user, updateUser, deleteUser} = useUserStore()
  const [userQuests, setUserQuests] = useState([])
  const{id, first_name, last_name, email, age, city, username} = user
  const [showProfile, setShowProfile] = useState(true)
  const [image, setImage] = useState("https://thispersondoesnotexist.com/")
  const [ title, setTitle] = useState(`${first_name} ${last_name}`)
  const [content, setContent] = useState("")
  const nav = useNavigate();

  useEffect(() => {
    fetch(`/api/users/${user.id}/userquests`)
      .then((response) => response.json())
      .then((data) => {
        setUserQuests(data)
      });
  }, [user]);

  const questsToDisp = userQuests.filter(quest => quest.status === 'In Progress' || quest.status === 'Not Started')
  const completedQuests = userQuests.filter(quest => quest.status === 'Completed')
  const forsakenQuests = userQuests.filter(quest => quest.status === 'Forsaken')

    const formik = useFormik({
        initialValues: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            age: age,
            city: city,
            username: username
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('Required'),
            last_name: Yup.string().required('Required'),
            email: Yup.string().required('Required').email('Invalid email address'),
            age: Yup.number().required('Required'),
            city: Yup.string(),
            username: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            const userObject = {
                "first_name": values.first_name,
                "last_name": values.last_name,
                "email": values.email,
                "age": values.age,
                "city": values.city,
                "username": values.username,
                "password": values.password
            }

            fetch(`/api/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObject)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response error");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    updateUser(data)
                })
                .catch(error => {
                    console.log("error", error.message);
                });

        },
    });
  return (
    <div className='dash-div'>
      <div className='questsTaken-div'>
        <div className='title-div'>
          <h1>Quests</h1>
        </div>
        <div className='questsTakenContainer'>
          {
            questsToDisp.map(userQuest => <QuestCard key={userQuest.id} quest={userQuest[`quest_rel`]} status={userQuest['status']} id={userQuest.id} setUserQuests={setUserQuests} userQuests={userQuests} userQuest={userQuest}/>)
          }
        </div>
      </div>
      <div className='sideBar-div'>
        <img src={image} alt={`${title} Image`} id='sideBarImg'/>
        <div className='questStat-div'>
            <h1>{title}</h1>
            <h2>{`@${username}`}</h2>
        </div>
        <div className='questStat-div'>
            <h4 className='questStat-h4'>Completed Quests</h4>
            <p className='questStat-p'>{completedQuests.length}</p>
        </div>
        <div className='questStat-div'>
            <h4 className='questStat-h4'>Completed Mage Quests</h4>
            <p className='questStat-p'>{[...completedQuests.filter(cQuest => cQuest[`quest_rel`]['genre'] === 'Mage')].length}</p>
        </div>
        <div className='questStat-div'>
            <h4 className='questStat-h4'>Completed Warrior Quests</h4>
            <p className='questStat-p'>{[...completedQuests.filter(cQuest => cQuest[`quest_rel`]['genre'] === 'Warrior')].length}</p>
        </div>
        <div className='questStat-div'>
            <h4 className='questStat-h4'>Completed Bard Quests</h4>
            <p className='questStat-p'>{[...completedQuests.filter(cQuest => cQuest[`quest_rel`]['genre'] === 'Bard')].length}</p>
        </div>
        <div className='questStat-div'>
            <h4 className='questStat-h4'>Forsaken Quests</h4>
            <p className='questStat-p'>{forsakenQuests.length}</p>
        </div>
        <Popup trigger=
                {<button className='editAccountBtn' >Edit Account</button>} 
                modal nested>
                {
                    close => (
                        <div className="popup-box">
                            <div className="box">
                                <button className="close-icon" onClick={() => close()}>x</button>
                                <form onSubmit={(e) => {
                                    formik.handleSubmit(e);
                                    close();
                                }}>
                                    <div className="input-group">
                                        <label>First Name</label>
                                        <input
                                            type="first_name"
                                            {...formik.getFieldProps('first_name')}
                                        />
                                        {formik.touched.first_name && formik.errors.first_name ? (
                                            <div className="error">{formik.errors.first_name}</div>
                                        ) : null}
                                    </div>
                                    <div className="input-group">
                                        <label>Last Name</label>
                                        <input
                                            type="last_name"
                                            {...formik.getFieldProps('last_name')}
                                        />
                                        {formik.touched.last_name && formik.errors.last_name ? (
                                            <div className="error">{formik.errors.last_name}</div>
                                        ) : null}
                                    </div>
                                    <div className="input-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            {...formik.getFieldProps('email')}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="error">{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className="input-group">
                                        <label>Age</label>
                                        <input
                                            type="age"
                                            {...formik.getFieldProps('age')}
                                        />
                                        {formik.touched.age && formik.errors.age ? (
                                            <div className="error">{formik.errors.age}</div>
                                        ) : null}
                                    </div>
                                    <div className="input-group">
                                        <label>City of Residence</label>
                                        <input
                                            type="city"
                                            {...formik.getFieldProps('city')}
                                        />
                                        {formik.touched.city && formik.errors.city ? (
                                            <div className="error">{formik.errors.city}</div>
                                        ) : null}
                                    </div>
                                    <div className="input-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            {...formik.getFieldProps('username')}
                                        />
                                        {formik.touched.username && formik.errors.username ? (
                                            <div className="error">{formik.errors.username}</div>
                                        ) : null}
                                    </div>
                                    <button type="submit">Finish</button>
                                </form>
                            </div>
                        </div>
                    )
                }
            </Popup>
        
        <button className='deleteAccountBtn' onClick={(e) => {
            fetch("/api/logout", {method: "DELETE"})
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response error");
                }
              })
              .then(() => {
                fetch(`/api/users/${id}`, {method: 'DELETE'})
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response error");
                      }
                })
                .then(() => {
                    deleteUser();
                    nav("/");
                })
                .catch((error) => {
                    console.log("error", error.message);
                })
              })
              .catch((error) => {
                console.log("error", error.message);
              });
        }}>Delete Account</button>
      </div>
    </div>
  )
}

export default Dashboard