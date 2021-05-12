import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, ScrollView, Text } from 'react-native';


export default function listTrip({ navigation }) {

    const [trip, setTrip] = useState("");
    const [expenseList, setExpenseList] = useState([{ name: '', amount: '', label: '' }]);

    //getting data from server
    function getTrip() {
        console.log("function called")

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        {
            fetch("http://localhost:8080/rio", requestOptions)
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

            <ScrollView >
                <FlatList
                    data={expenseList}
                    renderItem={({ item }) => (
                        <View >
                            <Text>{item.name}</Text>
                            <Text>{item.amount}</Text>
                            <Text>{item.label}</Text>
                        </View>
                    )}
                />
            </ScrollView>

            <View style={styles.buttons}>
                <Button
                    //onPress={ }
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
