import AsyncStorage from "@react-native-community/async-storage";

export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('react-native-todo');
        if(value !== null) {
            return JSON.parse(value);
        }
    } catch(e) {
        console.log(e)
    }
};

export const storeData = async (data) => {
    try {
        await AsyncStorage.setItem('react-native-todo', JSON.stringify(data))
    } catch (e) {
        console.log(e)
    }
};
