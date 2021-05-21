import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, FlatList } from 'react-native';
import { GiAirplaneArrival } from 'react-icons/gi';
import { RFValue } from 'react-native-responsive-fontsize';


export default function closeTrip({ navigation }) {

    /**
     * 
     */

    const [trip, setTrip] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [costsAmilcar, setCostsAmilcar] = useState(0);
    const [costsDavid, setCostsDavid] = useState(0);
    const [costsGreg, setCostsGreg] = useState(0);
    var total = costsAmilcar + costsDavid + costsGreg;
    const [showSummary, setShowSummary] = useState("none");
    const [showDetails, setShowDetails] = useState("none");
    const details = ["Name", "Amount", "Description"]
    const [maxList, setMaxList] = useState([]);
    const [minList, setMinList] = useState([]);

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
                    setShowDetails("none");
                    setShowSummary("flex");
                } else {
                    setShowSummary("none");
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

        fetch("http://localhost:8080/" + (trip.trim().toLowerCase()) + "/details", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setShowSummary("none");
                    setShowDetails("flex");
                } else {
                    setShowDetails("none");
                }
                console.log(data)
                console.log(data.max)
                console.log(data.min)
                setMaxList(data.max)
                setMinList(data.min)
                console.log(minList)
            })
    }
    //https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (

        <View style={styles.container}>
            <View style={styles.inputView}>
                <View style={styles.icon}>
                    <GiAirplaneArrival />
                </View>
                <TextInput style={styles.textInput}
                    onChangeText={setTrip}
                    placeholder="Trip label"
                />
            </View>
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
                width: "70%",
                justifyContent: 'space-around',
                display: showSummary,
                backgroundColor: "#faf1e6",
                borderWidth: 2,
                borderColor: "#064420",
                alignSelf: 'center'
            }} >
                <View style={{ marginLeft: 0, paddingLeft: 0 }}>
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
                    <Text>{(total / 3 - costsAmilcar).toFixed(2)}</Text>
                    <Text>{(total / 3 - costsDavid).toFixed(2)}</Text>
                    <Text>{(total / 3 - costsGreg).toFixed(2)}</Text>
                </View>
            </View>

            <View style={{
                alignContent: 'center',
                flexDirection: 'row',
                width: "70%",
                justifyContent: 'space-around',
                display: showDetails,
                backgroundColor: "#faf1e6",
                borderWidth: 2,
                borderColor: "#064420",
                alignSelf: 'center'
            }} >
                <FlatList
                    style={styles.tableLeft}
                    data={details}
                    ListHeaderComponent={<Text style={styles.tableHeader}>Data</Text>}
                    renderItem={({ item }) => (
                        <View >
                            <Text>{item}</Text>
                        </View>
                    )}
                />
                <FlatList
                    data={minList}
                    ListHeaderComponent={<Text style={styles.tableHeader}>Lowest expense</Text>}
                    ListHeaderComponentStyle={{ alignItems: 'center' }}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.tableBody}>{capitalizeFirstLetter(item)}</Text>
                        </View>
                    )}
                />
                <FlatList
                    data={maxList}
                    ListHeaderComponent={<Text style={styles.tableHeader}>Highest expense</Text>}
                    ListHeaderComponentStyle={{ alignItems: 'center' }}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.tableBody}>{capitalizeFirstLetter(item)}</Text>
                        </View>
                    )}
                />
            </View>
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
        margin: "1.25%",
        alignSelf: 'center'
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
    },
});