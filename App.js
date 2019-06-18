import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from "./Screens/HomeScreen";
import AddTodoScreen from "./Screens/AddTodoScreen";
import TodoDescriptionScreen from "./Screens/TodoDescriptIonScreen";


const MainNavigator = createStackNavigator({
    Home: {screen: HomeScreen},
    AddTodo: {screen: AddTodoScreen},
    TodoDescription: {screen: TodoDescriptionScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
