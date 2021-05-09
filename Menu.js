import React from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';

export default function Menu({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button
                    onPress={() => { navigation.navigate("Three") }}
                    title="Add expense"
                /></View>

            <View style={styles.buttons}>
                <Button
                    onPress={() => { navigation.navigate("Four") }}
                    title="Get a report"
                /></View>

            <View style={styles.buttons}>
                <Button
                    onPress={() => { navigation.navigate("Five") }}
                    title="Close trip"
                /></View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttons: {
        width: "30%",
        margin: "1%"
    }
});