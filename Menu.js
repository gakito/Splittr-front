import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

//a simple menu page, intentioning an easy map of the app with three pages 

export default function Menu({ navigation }) {

    return (
        // each onPress leads to a different page/js file
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button
                    onPress={() => { navigation.navigate("Three") }}
                    title="Add expense"
                    color='#064420'
                /></View>

            <View style={styles.buttons}>
                <Button
                    onPress={() => { navigation.navigate("Four") }}
                    title="Get a report"
                    color='#064420'
                /></View>

            <View style={styles.buttons}>
                <Button
                    onPress={() => { navigation.navigate("Five") }}
                    title="Close trip and Get Summary"
                    color='#064420'
                /></View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4efe7',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttons: {
        width: "45%",
        margin: "1.25%"
    }
});