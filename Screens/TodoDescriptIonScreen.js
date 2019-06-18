import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Text, Button, Label} from "native-base";
import {getData, storeData} from '../utils/storage'
export default class TodoDescriptionScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title').length > 15 ? 'Description' : navigation.getParam('title'),
        }
    };

    data = this.props.navigation.getParam('data');

    btnPressed = (name) => {
        getData()
            .then(todos => {
                let index = todos.findIndex((todo) => {
                    return todo.id === this.data.id
                });
                if (name === 'delete') {
                    todos.splice(index, 1);

                } else {
                    todos[index].status = true;
                }
                storeData(todos)
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
                {data.title.length > 15 ? <Label style={styles.label}> Title</Label>: null}
                {data.title.length > 15 ? <Text style={styles.description}>{data.title}</Text>: null}

                <View><Text>&nbsp;</Text></View>

                <Label style={styles.label}>Description</Label>
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
    label: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    displayer: {
        justifyContent: 'center',
        flexDirection: 'row'
    }
});
