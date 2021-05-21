import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Text } from 'react-native';
import { MdDescription } from 'react-icons/md';


export default function listTrip({ navigation }) {
    /**
     * @param trip 
     * @param expenseList an array with data got from server
     * @param show a string to hide or show a react component 
     */
    const [trip, setTrip] = useState("");
    const [expenseList, setExpenseList] = useState([{ name: '', amount: '', label: '' }]);
    const [show, setShow] = useState("none");

    //getting data from server to make a report with all expenses for that trip
    function getTrip() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        //the first two .then were obtained from https://mcculloughwebservices.com/2016/09/23/handling-a-null-response-from-an-api/. it checks if the json response is valid (not null or undefined)
        fetch("http://localhost:8080/" + (trip.trim().toLowerCase()), requestOptions)
            .then(response => response.text())
            .then(text =>
                text.length ? JSON.parse(text) : alert("Trip not found :("))
            .then((data) => {
                //this hides or shows the table section to see the report
                if (data) {
                    setShow("flex");
                } else {
                    setShow("none");
                }
                setExpenseList(data);
            });

    }

    // function got from https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript. it capitalizes the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <View style={styles.icon}>
                    <MdDescription />
                </View>
                <TextInput style={styles.textInput}
                    onChangeText={setTrip}
                    placeholder="Trip label"
                />
            </View>
            <View style={styles.buttons}>
                <Button
                    onPress={getTrip}
                    title="Get your report"
                    color='#064420'
                />
            </View>

            {/* style had to be put here as display value is a variable  */}
            <View style={{
                alignContent: 'center',
                flexDirection: 'row',
                width: "60%",
                justifyContent: 'space-around',
                display: show,
                backgroundColor: "#faf1e6",
                borderWidth: 2,
                borderColor: "#064420",
                alignSelf: 'center',
                margin: "5%"
            }} >
                {/* using Flatlist component to build a dinamic table */}
                {/* data is where flatlist will get data from, ListHeaderComponent sets a header for the list, and render item carries a function indicating what will be rendered */}
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
        justifyContent: 'center'
    },
    buttons: {
        width: "45%",
        margin: "2.5%",
        alignSelf: "center"
    },
    tableHeader: {
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: "#064420"
    },
    tableBody: {
        fontWeight: '500'
    },
    tableLeft: {
        paddingLeft: '0.8vw'
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
    textInput: {
        height: 40,
        borderColor: '#064420',
        borderWidth: 1,
        width: "45%",
        padding: "4px",
        backgroundColor: "#fdfaf6"
    },
});
