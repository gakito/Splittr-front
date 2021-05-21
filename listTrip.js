import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Text } from 'react-native';


export default function listTrip({ navigation }) {

    const [trip, setTrip] = useState("");
    const [expenseList, setExpenseList] = useState([{ name: '', amount: '', label: '' }]);
    const [show, setShow] = useState("none");

    //closing a trip so no more expenses can be added 
    function closing() {
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
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    //getting data from server
    function getTrip() {
        console.log("function called")

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        {
            fetch("http://localhost:8080/" + (trip.trim().toLowerCase()), requestOptions)
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        setShow("flex");
                    } else {
                        setShow("none");
                    }
                    setExpenseList(data);
                    console.log(data);
                });
        }
    }

    //https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <View style={styles.container}>
            <TextInput style={{
                height: 40,
                borderColor: '#064420',
                borderWidth: 1,
                width: "30%",
                marginTop: "5%",
                backgroundColor: "#fdfaf6"
            }}
                onChangeText={setTrip}
                placeholder="Trip label"
            />
            <View style={styles.buttons}>
                <Button
                    onPress={getTrip}
                    title="Get your report"
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
                <FlatList
                    style={styles.tableLeft}
                    data={expenseList}
                    ListHeaderComponent={<Text style={styles.tableHeader}>Name</Text>}
                    renderItem={({ item }) => (
                        <View >
                            <Text style={styles.tableBody}>{capitalizeFirstLetter(item.name)}</Text>
                        </View>
                    )}
                />
                <FlatList
                    data={expenseList}
                    ListHeaderComponent={<Text style={styles.tableHeader}>Amount</Text>}
                    ListHeaderComponentStyle={{ alignItems: 'center' }}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.tableBody}>{item.amount}</Text>
                        </View>
                    )}
                />
                <FlatList
                    data={expenseList}
                    ListHeaderComponent={<Text style={styles.tableHeader}>Description</Text>}
                    ListHeaderComponentStyle={{ alignItems: 'center' }}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.tableBody}>{item.label}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4efe7',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        width: "30%",
        margin: "3%"
    },
    // tableView: {
    //     alignContent: 'center',
    //     flexDirection: 'row',
    //     width: "50%",
    //     justifyContent: 'space-around',
    //     display:show
    //     backgroundColor: "#faf1e6",
    //     borderWidth: 2,
    //     borderColor: "#064420"
    // },
    tableHeader: {
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: "#064420",
        //fontSize: "1.7vw"
    },
    tableBody: {
        //fontSize: "1.4vw",
        fontWeight: '500'
    },
    tableLeft: {
        paddingLeft: '0.8vw'
    }
});
