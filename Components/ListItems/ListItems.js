import {Button, Icon, ListItem, Left, Body, Right, Text, View} from "native-base";
import React from "react";
import {StyleSheet, ScrollView} from "react-native";


const ListItems = props => {
    const styles = StyleSheet.create({
        noFound: {
            fontWeight: 'bold',
            textAlign: 'center',
            paddingTop: 150,
            fontSize: 30,
            color: 'rgba(142,137,146,0.86)'
        },
    });
    const listItem = ( props.todos.length > 0 ?
        props.todos.map((todo, index) => (
            <ListItem key={index} icon onPress={() => {
                props.click('TodoDescription', todo.title, todo)
            }}>
                <Left>
                    <Button style={todo.priority === 'high' ? {backgroundColor: "red"} : todo.priority === 'moderate' ?  {backgroundColor: "#FF9501"} : {backgroundColor: "#126263"}}>
                        <Icon name="info" type='AntDesign'/>
                    </Button>
                </Left>
                <Body>
                    <Text style={todo.status ? {textDecorationLine: 'line-through', color: '#424242'} : {}}>{todo.title.length > 15 ? todo.title.slice(0, 15)+'...': todo.title}</Text>
                    <Text note>Created At: {todo.createdAt}</Text>
                </Body>
                <Right  >
                    <Text onPress={() => { props.btnClick(todo.status, index) }} style={!todo.status ? {fontSize: 15, color: 'rgba(3,16,211,0.82)'} : {fontSize: 15, color: 'rgba(211,40,53,0.82)'}  }>{!todo.status ? 'Mark as Done': 'Delete'}</Text>
                </Right>
            </ListItem>
        ))
        : <Text style={styles.noFound}> No Todos Found</Text>);

    return (
        <ScrollView>
            {listItem}
        </ScrollView>
    )
};

export default ListItems;
