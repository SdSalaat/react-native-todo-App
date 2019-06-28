import {Button, Form, Icon, Input, Item, Label, Picker, Text, Textarea} from "native-base";
import React from "react";

import PickDateTime from "./DateTimePicker";

const Todo = props => {
    return (
        <Form style={{padding: 10}}>
            <Item picker>
                <Label style={{padding: 15}} >Select Priority : </Label>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down"/>}
                    placeholder="Select"
                    placeholderStyle={{color: "#bfc6ea"}}
                    placeholderIconColor="#007aff"
                    selectedValue={props.priority}
                    onValueChange={(e) => {props.change(e, 'priority')}}
                >
                    <Picker.Item label="High" value="high"/>
                    <Picker.Item label="Moderate" value="moderate"/>
                    <Picker.Item label="Low" value="low"/>
                </Picker>
            </Item>

            <Item fixedLabel>
                <Label>Title </Label>
                <Input onChange={(e) => {props.change(e, 'title')}} placeholder='Enter Title Here' />
            </Item>

            <PickDateTime
                timePicker={props.timePicker}
                showPicker={props.showPicker}
                setDate={props.setDate}
                setTime={props.setTime}
                datePicker={props.datePicker}
                reminderDate={props.reminderDate}
                onCancel={props.onCancel}
            />
            <Textarea onChange={(e) => {props.change(e, 'description')}} rowSpan={5} bordered placeholder="Description"/>
            <Button onPress={() => {
                if(props.title.trim() !== ""){
                    props.save()
                } else {
                    alert('Title is Required')
                }
            }} style={{marginTop: 10}} block rounded>
                <Text>Submit</Text>
            </Button>
        </Form>
    );
};

export default Todo;

