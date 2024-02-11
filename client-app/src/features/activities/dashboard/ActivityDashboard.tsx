import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities: Activity[];
    cancelSelectedActivity:()=>void;
    manageSelectedActivity:(id:string)=>void
    selectedActivity:Activity|undefined
    editMode: Boolean;
    openForm:(id:string)=>void;
    closeForm:()=>void;
    createOrEdit:(activity:Activity)=>void
    deleteActivity:(id:string)=>void
}


export default function ActivityDashboard({deleteActivity,activities,createOrEdit,selectedActivity, cancelSelectedActivity,manageSelectedActivity,closeForm,openForm,editMode}:Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList deleteActivity={deleteActivity} activities={activities}
                manageSelectedActivity={manageSelectedActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails activity={selectedActivity}
                cancelSelectedActivity={cancelSelectedActivity}
                openForm={openForm}
                />}
                {editMode && 
                <ActivityForm createOrEdit={createOrEdit} closeForm={closeForm} activity={selectedActivity}/>}
            </Grid.Column>
        </Grid>
    )
}