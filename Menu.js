import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default function Menu({ navigation }) {

    return (
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
        width: "30%",
        margin: "1%"
    }
});