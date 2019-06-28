import DateTimePicker from "react-native-modal-datetime-picker";
import {Button, Text, ListItem, Label} from 'native-base';
import React from "react";

const showProperTime = (d) => {
    if(typeof d !== "string"){
        let dd = String(d.getDate()).padStart(2, '0');
        let mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = d.getFullYear();
        let time = d.getHours() +":"+ d.getMinutes();

        return  mm + '/' + dd + '/' + yyyy + " , " + time;
    }
};
const PickDateTime = props => {

    return (
        <>
            {props.reminderDate !== ''
                ? <ListItem><Label>Reminder : &nbsp;</Label><Text>{showProperTime(props.reminderDate)} </Text><Button onPress={props.showPicker} style={{float: 'right'}} transparent><Text>Change</Text></Button></ListItem>
                : <Button onPress={props.showPicker} light full><Text>Set Reminder</Text></Button>}

            <DateTimePicker
                isVisible={props.datePicker}
                onConfirm={(e) => {props.setDate(e)}}
                onCancel={() => {
                    props.onCancel()
                }}
            />


            <DateTimePicker
                mode='time'
                isVisible={props.timePicker}
                onConfirm={(e) => {
                    props.setTime(e)
                }}
                onCancel={() => {
                    props.onCancel()
                }}
            />
        </>

    )
};

export default PickDateTime;
