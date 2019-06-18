import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Text, Button} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";

export default class TodoDescriptionScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title'),
        }
    };

    data = this.props.navigation.getParam('data');
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

    btnPressed = (name) => {
        this.getData()
            .then(todos => {
                let index = todos.findIndex((todo) => {
                    return todo.id === this.data.id
                });
                if (name === 'delete') {
                    todos.splice(index, 1);

                } else {
                    todos[index].status = true;
                }
                this.storeData(todos)
                    .then(() => {
                       this.props.navigation.pop();
                    });
            });
    };

    render() {
        const {navigate} = this.props.navigation;
        const data = this.props.navigation.getParam('data');
        return (
            <ScrollView style={{padding: 10}}>
                <Text style={styles.description}>{data.description}</Text>

                <View style={styles.displayer}>

                    {!data.status ? <Button onPress={() => {
                        this.btnPressed('done')
                    }} small style={{margin: 5}}><Text>Mark As Done</Text></Button>: null}

                    <Button onPress={() => {
                        this.btnPressed('delete')
                    }} small danger style={{margin: 5}}><Text>Delete</Text></Button>

                </View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    description: {
        textAlign: 'center',
        color: '#424242',
        borderColor: '#7e7e7e',
        padding: 5
    },
    displayer: {
        justifyContent: 'center',
        flexDirection: 'row'
    }
});
