import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

export default function listTrip({ navigation }) {

    const [trip, setTrip] = useState("");
    const [obj, setObj] = useState([]);

    function mountList(obj) {
        obj[0].amount
        obj[0].label
    }

    function getTrip() {
        console.log("function called")
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            // Headers: myHeaders
        };

        fetch("http://localhost:8080/rio", requestOptions)
            .then(response => response.json())
            .then((data) => {
                setObj(data);
                console.log(data);
                console.log("Amount: " + data[0].amount);
                console.log(data[0].label);
            });
    }

    return (
        <View style={styles.container}>
            <TextInput style={{
                height: 40,
                borderColor: 'blue',
                borderWidth: 1,
                width: "30%"
            }}
                onChangeText={setTrip}
                placeholder="Trip label"
            />
            <View style={styles.buttons}>
                <Button
                    onPress={getTrip}
                    title="Get your report"
                />
            </View>
        </View>


    )
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
