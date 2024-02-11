import React from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Icon, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity
    cancelSelectedActivity:()=>void;
    openForm:(id:string)=>void;
}
export default function ActivityDetails({ activity ,cancelSelectedActivity,openForm}: Props) {

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span className='date'>{activity.date}</span>
                </CardMeta>
                <CardDescription>
                    {activity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group width='2'>
                    <Button basic color='blue' content='Edit' onClick={()=>openForm(activity.id)}/>
                    <Button basic color='grey' content='Cancel' onClick={cancelSelectedActivity} />
                </Button.Group>
            </CardContent>
        </Card>
    );

}