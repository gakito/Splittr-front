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
    const [max, setMax] = useState();
    const [maxUser, setMaxUser] = useState();
    const [maxLabel, setMaxLabel] = useState();
    const [min, setMin] = useState();
    const [minUser, setMinUser] = useState();
    const [minLabel, setMinLabel] = useState();
    const [maxList, setMaxList] = useState([{ name: '', amount: '', label: '' }]);
    const [minList, setMinList] = useState([{ name: '', amount: '', label: '' }]);



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
        console.log(total)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/" + (trip.trim().toLowerCase()) + "/summary", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setShow("flex");
                } else {
                    setShow("none");
                }
                console.log(data)
                if (data.amilcar) {
                    setCostsAmilcar(data.amilcar);
                } if (data.david) {
                    setCostsDavid(data.david);
                }
                if (data.greg) {
                    setCostsGreg(data.greg);
                }
            })
            .catch(error => console.log('error', error));


    }

    function getDetails() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/rio/details", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data.max)
                setMaxList(data.max)
                setMaxList(data.max[0])
            })
    }

    return (

        <View style={styles.container}>
            <TextInput style={styles.textInput}
                onChangeText={setTrip}
                placeholder="Trip label"
            />
            <View style={styles.buttons}>
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
            <View style={styles.buttons}>
                <Button
                    onPress={() => {
                        getDetails();
                    }}
                    title="Get Details"
                    color='#064420'
                />
            </View>

            <View style={{
                alignContent: 'center',
                flexDirection: 'row',
                width: "40%",
                justifyContent: 'space-around',
                display: show,
                backgroundColor: "#faf1e6",
                borderWidth: 2,
                borderColor: "#064420"
            }} >
                <View style={{ marginLeft: 0 }}>
                    <Text style={styles.tableHeader} >User</Text>
                    <Text>Amilcar</Text>
                    <Text>David</Text>
                    <Text>Greg</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.tableHeader}>Amount paid (€) </Text>
                    <Text>{costsAmilcar}</Text>
                    <Text>{costsDavid}</Text>
                    <Text>{costsGreg}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.tableHeader}>Amount to pay (€) </Text>
                    <Text >{(total / 3 - costsAmilcar).toFixed(2)}</Text>
                    <Text >{(total / 3 - costsDavid).toFixed(2)}</Text>
                    <Text >{(total / 3 - costsGreg).toFixed(2)}</Text>
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
    tableHeader: {
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: "#064420",
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