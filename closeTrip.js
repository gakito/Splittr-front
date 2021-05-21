import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, FlatList } from 'react-native';
import { GiAirplaneArrival } from 'react-icons/gi';


export default function closeTrip({ navigation }) {

    /**
     * @param trip
     * @param userMessage a string to inform the user if a trip was succesfully closed 
     * @param costsAmilcar total expense by the user amilcar
     * @param costsDavid total expense by the user david
     * @param costsGreg total expense by the user greg
     * @param total total expense of a trip
     * @param showSummary hides or shows summary table component
     * @param showDetails hides or shows details table component
     * @param details array of details attributes
     * @param maxList details of the highest expense of a trip
     * @param minList details of the lowest exepense of a trip
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

    //function to close a trip
    function closing() {

        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        //this fetch returns a boolean. if true, the trip was closed. if false, trip may not exist
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

    //function to get a summary from a trip
    async function getSummary() {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        //fetch returns a json.
        fetch("http://localhost:8080/" + (trip.trim().toLowerCase()) + "/summary", requestOptions)
            .then(response => response.json())
            .then(data => {
                //conditional to hide or show the component where the table is located
                if (data) {
                    setShowDetails("none");
                    setShowSummary("flex");
                } else {
                    setShowSummary("none");
                }
                //these if are important is if data.* doesn't exist, costs* still equals 0. otherwise, costs* would not be a number, making no sense on the table. 
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

    //function to get details from a trip, like highest and lowest expense
    function getDetails() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/" + (trip.trim().toLowerCase()) + "/details", requestOptions)
            .then(response => response.json())
            .then(data => {
                //same conditional to hide or show the component where details table is located. this and the preivious one can not exist simultaneously
                if (data) {
                    setShowSummary("none");
                    setShowDetails("flex");
                } else {
                    setShowDetails("none");
                }
                //setting data to maxList and minList
                setMaxList(data.max)
                setMinList(data.min)
            })
    }

    //function got from https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript. it capitalizes the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <View style={styles.icon}>
                    <GiAirplaneArrival />
                </View>
                {/* setting trip */}
                <TextInput style={styles.textInput}
                    onChangeText={setTrip}
                    placeholder="Trip label"
                />
            </View>
            <View style={styles.buttons}>
                {/* calling closing function */}
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
                {/* calling getSummary function */}
                <Button
                    onPress={() => {
                        getSummary();
                    }}
                    title="Get Summary"
                    color='#064420'
                />
            </View>
            <View style={styles.buttons}>
                {/* calling getDetails function */}
                <Button
                    onPress={() => {
                        getDetails();
                    }}
                    title="Get Details"
                    color='#064420'
                />
            </View>

            {/* table to show a summary of a trip  */}
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

                {/* the following view is made a calculation of the arithmetic average of the total costs */}
                {/* .toFixed(x) limits number the decimal places at x  */}
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