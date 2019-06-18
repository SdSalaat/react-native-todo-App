import React from 'react';
import Todo from "../Components/Todo/Todo";
import AsyncStorage from "@react-native-community/async-storage";

export default class AddTodoScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title'),
        }
    };

    state = {
        id: '',
        priority: 'low',
        title: '',
        description: '',
        createdAt: '',
        status: false
    };
    saveToMemory = () => {
        this.getData()
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
                this.storeData(data)
                    .then(store => {
                        this.props.navigation.navigate('Home')
                    })
            });
    };

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('react-native-todo');
            if(value !== null) {
                return JSON.parse(value);
            }
        } catch(e) {
            console.log(e)
        }
    };

    storeData = async (data) => {
        try {
            await AsyncStorage.setItem('react-native-todo', JSON.stringify(data))
        } catch (e) {
            console.log(e)
        }
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
            <Todo title={this.state.title} priority={this.state.priority} save={() => {
                this.saveToMemory()
            }} change={(e, name) => this.changeHandler(e, name)}/>
        );
    }
}

