import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text } from 'react-native';
import { MdEuroSymbol, MdDescription } from 'react-icons/md';
import { ImAirplane } from 'react-icons/im';


export default function AddExpense({ navigation }) {

    const [trip, setTrip] = useState("");
    const [amount, setAmount] = useState(0);
    const [label, setLabel] = useState("");
    const [userMessage, setUserMessage] = useState("");

    function expense() {
        console.log("function called");

        var username = sessionStorage.getItem("user");
        var token = sessionStorage.getItem("token");

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var raw = JSON.stringify({
            "name": username,
            "amount": amount,
            "label": label
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        //https://mcculloughwebservices.com/2016/09/23/handling-a-null-response-from-an-api/
        fetch("http://localhost:8080/" + (trip.trim().toLowerCase()) + "/expense", requestOptions)
            //.then(response => response.json())
            .then(response => response.text())
            .then(text =>
                text.length ? JSON.parse(text) : setUserMessage("Trip closed. Not allowed to add more expenses."))
            // if (response == null) {
            //     setUserMessage("Trip closed. Not allowed to add more expenses.")
            //     //response.json()
            // } else {
            //     response.json()
            //setUserMessage("Trip closed. Not allowed to add more expenses.")
            //}
            //})
            .then(data => {
                if (data != null) {
                    console.log('Success:', data);
                }
                // else {
                //     setUserMessage("Trip closed. Not allowed to add more expenses.")
                // }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (

        <View style={styles.container}>
            <TextInput style={styles.textInput}
                onChangeText={setTrip}
                placeholder="Trip label"
            />
            <TextInput style={styles.textInput}
                onChangeText={setAmount}
                placeholder="Amount"
            />
            <TextInput style={styles.textInput}
                placeholder="Description"
                onChangeText={setLabel}
            />
            <View style={styles.buttons}>
                <Button
                    onPress={() => {
                        expense();
                    }}
                    title="Add Expense"
                    color='#064420'
                />
            </View>
            <Text>{userMessage}</Text>
        </View>
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
    },

    textInput: {
        height: 40,
        borderColor: '#064420',
        borderWidth: 1,
        width: "30%",
        margin: "0.5%",
        padding: "4px",
        backgroundColor: "#fdfaf6"
    }
});