import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Text } from 'react-native';

export default function Summary({ navigation }) {

    const [trip, setTrip] = useState("");
    //const [userMessage, setUserMessage] = useState("");

    function getSummary() {
        console.log("function called");

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/rio/summary", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                //console.log(data.amilcar)
            })
            .catch(error => console.log('error', error));
    }

    return (

        <View style={styles.container}>
            <TextInput style={{
                height: 40,
                borderColor: 'blue',
                borderWidth: 1,
                width: "30%",
                margin: "0.5%",
                padding: "4px"
            }}
                onChangeText={setTrip}
                placeholder="Trip label"
            />
            <View style={styles.buttons}>
                <Button
                    onPress={() => {
                        getSummary();
                    }}
                    title="Summary"
                />
            </View>
            <View>
                <Text>{userMessage}</Text>
            </View>
        </View>
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