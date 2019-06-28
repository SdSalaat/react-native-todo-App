import React from 'react';
import Todo from "../Components/Todo/Todo";
import {getData, storeData} from '../utils/storage'

export default class AddTodoScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title'),
        }
    };

    state = {
        id: '',
        priority: 'low',
        showDatePicker: false,
        showTimePicker: false,
        title: '',
        reminderDate: '',
        description: '',
        createdAt: '',
        status: false
    };

    showPicker = () => {
        this.setState({
            showDatePicker: true
        })
    };

    setDate = (e) => {
        let reminderDate = new Date(e).getUTCFullYear() + "-" + (new Date(e).getMonth() + 1) + "-" + new Date(e).getDate()
        this.setState({
            ...this.state,
            reminderDate: reminderDate,
            showTimePicker: true,
            showDatePicker: false
        });
    };

    setTime = (e) => {
        let hours = new Date(e).getHours();
        let mins = new Date(e).getMinutes();
        let completeDate = new Date(this.state.reminderDate);
        completeDate.setHours(hours);
        completeDate.setMinutes(mins);
        this.setState({
            ...this.state,
            reminderDate: completeDate,
            showTimePicker: false,
        });
    };

    cancelReminderWindow = () => {
        this.setState({
            ...this.state,
            showTimePicker: false,
            showDatePicker: false,
            reminderDate: ''
        });
    };

    saveToMemory = () => {
        getData()
            .then(data => {
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();
                today = mm + '/' + dd + '/' + yyyy;
                this.setState({
                    createdAt: today,
                    id: data.length
                });
                data.push(this.state);
                storeData(data)
                    .then(store => {
                        this.props.navigation.navigate('Home')
                    })
            });
    };


    changeHandler = (e, name) => {
        if (name === 'priority') {
            this.setState({
                ...this.state,
                [name]: e
            });
        } else if (name === 'title' || name === 'description') {
            this.setState({
                ...this.state,
                [name]: e.nativeEvent.text
            });
        }
    };


    render() {
        return (
            <Todo
                title={this.state.title}
                priority={this.state.priority}
                save={() => {
                    this.saveToMemory()
                }}
                showPicker={this.showPicker.bind(this)}
                change={(e, name) => this.changeHandler(e, name)}
                setDate={(date) => this.setDate(date)}
                setTime={(time) => this.setTime(time)}
                timePicker={this.state.showTimePicker}
                reminderDate={this.state.reminderDate}
                onCancel={this.cancelReminderWindow.bind(this)}
                datePicker={this.state.showDatePicker}
            />
        );
    }
}

