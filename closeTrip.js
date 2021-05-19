import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, TouchableOpacity } from 'react-native';


export default function closeTrip({ navigation }) {

    const [trip, setTrip] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [costsAmilcar, setCostsAmilcar] = useState(0);
    const [costsDavid, setCostsDavid] = useState(0);
    const [costsGreg, setCostsGreg] = useState(0);
    var total = costsAmilcar + costsDavid + costsGreg;
    const [show, setShow] = useState("none");



    function closing() {
        console.log("function called");

        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/" + (trip.trim().toLowerCase()) + "/close", requestOptions)
            .then(response => response.text())
            .then(data => {
                if (data == "true") {
                    setUserMessage("Trip closed successfully!")
                } else {
                    setUserMessage("This trip was not found. Please try again.")
                }
                console.log(typeof (data))
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    async function getSummary() {
        console.log("summary function called");

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/rio/summary", requestOptions)
            .then(response => {
                response.json()
                //console.log(response.json())
                // if (response.ok) {
                //     setShow("flex");
                // } else {
                //     setShow("none");
                //     alert("There is no trip with that name :(")
                // }
            })
            .then(data => {
                console.log(data)
                setCostsAmilcar(data.amilcar);
                setCostsDavid(data.david);
                setCostsGreg(data.greg);
            })
            .catch(error => console.log('error', error));
    }

    return (

        <View style={styles.container}>
            <TextInput style={styles.textInput}
                onChangeText={setTrip}
                placeholder="Trip label"
            />
            <View style={styles.buttons}>
                {/* <TouchableOpacity
                    onPress={() => { closing() }}
                    style={{ backgroundColor: "#064420", alignItems: "center", paddingVertical: "0.7vw", justifyContent: 'center', alignContent: 'center' }}
                >
                    <Text style={{ fontSize: "1.5vw", fontWeight: '500', color: 'white', fontFamily: '' }}>CLOSE TRIP</Text>
                </TouchableOpacity> */}
                <Button
                    onPress={() => {
                        closing();
                    }}
                    title="Close trip"
                    color='#064420'
                />
            </View>
            <View>
                <Text>{userMessage}</Text>
            </View>
            <View style={styles.buttons}>
                <Button
                    onPress={() => {
                        getSummary();
                    }}
                    title="Get Summary"
                    color='#064420'
                />
            </View>
            <View style={styles.tableView} >
                <View style={{}}>
                    <Text style={styles.tableHeader} >User</Text>
                    <Text style={styles.tableBody}>Amilcar</Text>
                    <Text style={styles.tableBody}>David</Text>
                    <Text style={styles.tableBody}>Greg</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.tableHeader}>Amount paid (€) </Text>
                    <Text style={styles.tableBody}>{costsAmilcar}</Text>
                    <Text style={styles.tableBody}>{costsDavid}</Text>
                    <Text style={styles.tableBody}>{costsGreg}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.tableHeader}>Amount to pay (€) </Text>
                    <Text style={styles.tableBody}>{(total / 3 - costsAmilcar).toFixed(2)}</Text>
                    <Text style={styles.tableBody}>{(total / 3 - costsDavid).toFixed(2)}</Text>
                    <Text style={styles.tableBody}>{(total / 3 - costsGreg).toFixed(2)}</Text>
                </View>
            </View>
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

    tableView: {
        alignContent: 'center',
        flexDirection: 'row',
        width: "50%",
        justifyContent: 'space-around',
        display: 'flex',
        backgroundColor: "#faf1e6",
        borderWidth: 2,
        borderColor: "#064420"
    },
    tableHeader: {
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: "#064420",
        fontSize: "1.7vw"
    },
    tableBody: {
        fontSize: "1.4vw",
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