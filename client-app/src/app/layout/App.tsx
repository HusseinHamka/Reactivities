
import { useEffect, useState } from 'react'
import './styles.css'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from './../models/activity'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, selectActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<Boolean>(false);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      })
  }, [])
  function manageSelectedActivity(id: string) {
    selectActivity(activities.find(i => i.id == id));
  }
  function cancelSelectedActivity() {
    selectActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? manageSelectedActivity(id) : cancelSelectedActivity;
    setEditMode(true);
  }
  function handleFormClose(){
    setEditMode(false);
  }
   
  function handleCreateOrEditActivity(activity:Activity){
    activity.id?
    setActivities([...activities.filter(x=>x.id!== activity.id), activity])
    : setActivities([...activities,{...activity,id:uuid()}])
    setEditMode(false);
    selectActivity(activity)
  }

  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(x=>x.id !==id)])
  }

  //const activities = GetActivities();
  return (

    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{ marginTop: '7em' }} >
        <ActivityDashboard activities={activities}
          manageSelectedActivity={manageSelectedActivity}
          cancelSelectedActivity={cancelSelectedActivity}
          selectedActivity={selectedActivity} 
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity} />
          
      </Container>

    </>

  )
}

export default App
