import React from 'react';
import {Icon, View} from "native-base";
import ListItems from "../Components/ListItems/ListItems";
import {getData, storeData} from '../utils/storage'
import {AppState} from 'react-native'
import PushNotification from 'react-native-push-notification';
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

    _handleAppStateChange = (appState) => {
        console.log('App is in Background now');
        // if(appState === 'background') {
        //     PushNotification.localNotificationSchedule({
        //         message: "Uno Duos Treas Quatro sinco",date: new Date(Date.now() + (5 * 1000))
        //     });
        // }

    };

    componentWillUnmount(): void {
        this.willFocusListener.remove();
        AppState.addEventListener('change', this._handleAppStateChange.bind(this));
    }

    componentDidMount() {
        PushNotification.localNotificationSchedule({
            message: "New One",date: new Date(Date.now() + (5 * 1000))
        });
        AppState.addEventListener('change', this._handleAppStateChange.bind(this));


        // AsyncStorage.clear();
        this.willFocusListener = this.props.navigation.addListener(
            'willFocus',
            () => {
                getData()
                    .then(data => {
                        this.setState({
                            ...this.state,
                            todos: data
                        });
                    });
            }
        );
        getData()
            .then(data => {
                if (data === undefined) {
                    let todo = [];
                    storeData(todo)
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
        storeData(todos);
    };

    navigateToDesc = (name, title, data?) => {
        this.props.navigation.navigate(name, {title: title, data})
    };


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{padding: 10}}>
                <ListItems btnClick={(status, index) => {
                    this.handleClick(status, index)
                }} todos={this.state.todos.reverse()} click={(name, title, data?) => {
                    this.navigateToDesc(name, title, data)
                }}/>
            </View>
        );
    }
}