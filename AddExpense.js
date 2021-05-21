import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text } from 'react-native';
import { MdEuroSymbol, MdLabelOutline } from 'react-icons/md';
import { ImAirplane } from 'react-icons/im';


export default function AddExpense({ navigation }) {
    /**
     * @param trip defined by the user on text input and used to fetch the server
     * @param amount is the value of an expense, inserted by the user
     * @param label is the description of the expense
     * @param userMessage a string to be setted if the user try to add expense on a closed trip
     */

    const [trip, setTrip] = useState("");
    const [amount, setAmount] = useState(0);
    const [label, setLabel] = useState("");
    const [userMessage, setUserMessage] = useState("");

    //POST method to save data inserted by the user on the server
    function expense() {
        console.log("function called");

        //getting the token and username stored on login. token is verified by the server. username is used to set an expense, as expenses are add on behalf of the user is logged in 
        var username = sessionStorage.getItem("user");
        var token = sessionStorage.getItem("token");

        //sending token to the server and specifying what kind of data is being sent
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        //body part of fetch, variables defined by the user that will be stored on server 
        var raw = JSON.stringify({
            "name": username,
            "amount": amount,
            "label": label
        });

        //passing parameters of the fetch
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        //the first two .then were obtained from https://mcculloughwebservices.com/2016/09/23/handling-a-null-response-from-an-api/. it checks if the json response is valid (not null or undefined)
        fetch("http://localhost:8080/" + (trip.trim().toLowerCase()) + "/expense", requestOptions)
            .then(response => response.text())
            .then(text =>
                text.length ? JSON.parse(text) : setUserMessage("Trip closed. Not allowed to add more expenses."))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (

        <View style={styles.container}>
            <View style={styles.inputView}>
                <View style={styles.icon}>
                    <ImAirplane />
                </View>
                {/* setting trip */}
                <TextInput style={styles.textInput}
                    onChangeText={setTrip}
                    placeholder="Trip label"
                />
            </View>
            <View style={styles.inputView}>
                <View style={styles.icon}>
                    <MdEuroSymbol />
                </View>
                {/* setting amount */}
                <TextInput style={styles.textInput}
                    onChangeText={setAmount}
                    placeholder="Amount"
                />
            </View>
            <View style={styles.inputView}>
                <View style={styles.icon}>
                    <MdLabelOutline />
                </View>
                {/* setting label */}
                <TextInput style={styles.textInput}
                    placeholder="Description"
                    onChangeText={setLabel}
                />
            </View>
            <View style={styles.buttons}>
                {/* calls function expense to fetch the server */}
                <Button
                    onPress={() => {
                        expense();
                    }}
                    title="Add Expense"
                    color='#064420'
                />
            </View>
            {/* message shown to the user if trip is closed */}
            <Text style={{ alignSelf: 'center' }}>{userMessage}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4efe7',
        justifyContent: 'center',
    },

    buttons: {
        width: "45%",
        margin: "2.5%",
        alignSelf: "center"
    },

    textInput: {
        height: 40,
        borderColor: '#064420',
        borderWidth: 1,
        width: "45%",
        padding: "4px",
        backgroundColor: "#fdfaf6"
    },
    inputView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: "5px"
    },
    icon: {
        borderWidth: 1,
        borderRightWidth: 0,
        padding: 4,
        height: "40px",
        width: '40px',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#064420',
        backgroundColor: "#fdfaf6"
    }
});