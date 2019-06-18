import React from 'react';
import {Icon, View} from "native-base";
import ListItems from "../Components/ListItems/ListItems";
import AsyncStorage from '@react-native-community/async-storage';

export default class HomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Welcome',
            headerRight: (
                <Icon type="AntDesign" name="plus" onPress={() => {
                    navigation.push('AddTodo', {title: 'Add Todo'})
                }}/>
            )
        }
    };

    state = {
        todos: []
    };

    componentWillUnmount(): void {
        this.willFocusListener.remove()
    }

    componentDidMount() {
        // AsyncStorage.clear();
        this.willFocusListener = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.getData()
                    .then(data => {
                        this.setState({
                            ...this.state,
                            todos: data
                        });
                    });
            }
        );
        const todos = this.getData()
            .then(data => {
                if (data === undefined) {
                    let todo = [];
                    this.storeData(todo)
                        .then(data => console.log(data))
                } else {
                    this.setState({
                        ...this.state,
                        todos: data
                    })
                }
            });
    }

    handleClick = (status, index) => {
        const todos = this.state.todos;
        if (status) {
            todos.splice(index, 1)
        } else {
            todos[index].status = true;
        }
        this.setState({
            ...this.state,
            todos: todos
        });
        this.storeData(todos);
    };

    navigateToDesc = (name, title, data?) => {
        this.props.navigation.navigate(name, {title: title, data})
    };

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('react-native-todo');
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (e) {
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


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{padding: 10}}>
                <ListItems btnClick={(status, index) => {this.handleClick(status, index)}} todos={this.state.todos.reverse()} click={(name, title, data?) => {
                    this.navigateToDesc(name, title, data)
                }}/>
            </View>
        );
    }
}
