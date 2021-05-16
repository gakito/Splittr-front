import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Text } from 'react-native';


export default function listTrip({ navigation }) {

    const [trip, setTrip] = useState("");
    const [expenseList, setExpenseList] = useState([{ name: '', amount: '', label: '' }]);

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
            fetch("http://localhost:8080/rio"  /*+ (trip.trim().toLowerCase()) */, requestOptions)
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    setExpenseList(data);
                    console.log(expenseList);
                });
        }
    }

    return (
        <View style={styles.container}>
            <TextInput style={{
                height: 40,
                borderColor: 'blue',
                borderWidth: 1,
                width: "30%",
                marginTop: "5%"
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

            <View style={{ flexDirection: "row", width: "30%" }} >
                <FlatList
                    data={expenseList}
                    ListHeaderComponent={<Text>Name</Text>}
                    renderItem={({ item }) => (
                        <View >
                            <Text>{item.name}</Text>
                        </View>
                    )}
                />
                <FlatList
                    data={expenseList}
                    ListHeaderComponent={<Text>Amount</Text>}
                    ListHeaderComponentStyle={{ alignItems: 'center' }}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Text>{item.amount}</Text>
                        </View>
                    )}
                />
                <FlatList
                    data={expenseList}
                    ListHeaderComponent={<Text>Description</Text>}
                    ListHeaderComponentStyle={{ alignItems: 'center' }}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Text>{item.label}</Text>
                        </View>
                    )}
                />
            </View>

            <View style={styles.buttons}>
                <Button
                    onPress={closing}
                    title="Close trip"
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
        justifyContent: 'center'
    },
    buttons: {
        width: "30%",
        margin: "3%"
    }
});
