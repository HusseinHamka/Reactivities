
import { useEffect, useState } from 'react'
import './styles.css'
import { Container } from 'semantic-ui-react';
import { Activity } from './../models/activity'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, selectActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<Boolean>(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let activities: Activity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        })
        setActivities(activities)
        setLoading(false);
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
  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true)
    if (activity.id) {
      agent.Activities.update(activity).then(
        () => {
          setActivities([...activities.filter(x => x.id !== activity.id), activity])
          selectActivity(activity)
          setEditMode(false);
          setSubmitting(false)
        }
      )
    }
    else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        selectActivity(activity)
        setEditMode(false);
        setSubmitting(false)
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true)
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false);

    })
  }
  if (loading) return <LoadingComponent content='Loading app' />

  //const activities = GetActivities();
  return (

    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }} >
        <ActivityDashboard activities={activities}
          manageSelectedActivity={manageSelectedActivity}
          cancelSelectedActivity={cancelSelectedActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity} 
          submitting={submitting} />
          

      </Container>

    </>

  )
}

export default App
