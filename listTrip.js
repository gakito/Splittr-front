import React, { useState, Component } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList } from 'react-native';

export default function listTrip({ navigation }) {

    const [trip, setTrip] = useState("");
    const [obj, setObj] = useState({});
    var body;

    //returning list
    function mountList(obj) {
        body = document.body
        var tbl = document.createElement('table');
        body.style.verticalAlign = 'sub';
        tbl.style.width = '500px';
        tbl.style.border = '1px solid black';
        tbl.style.verticalAlign = 'sub';
        tbl.style.display = 'block';

        var th = tbl.insertRow();
        var hd = th.insertCell();
        hd.appendChild(document.createTextNode("Name"))
        hd = th.insertCell();
        hd.appendChild(document.createTextNode("Amount"))
        hd = th.insertCell();
        hd.appendChild(document.createTextNode("Description"))

        for (var i = 0; i < obj.length; i++) {
            var tr = tbl.insertRow();
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(obj[i].name));
            td.style.border = '1px solid black';
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(obj[i].amount.toString()));
            td.style.border = '1px solid black';
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(obj[i].label));
            td.style.border = '1px solid black';
        }
        body.appendChild(tbl);
    }

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
                    setObj(data);
                    console.log("length is: " + data.length);
                    //mountList(data);
                });
        }
    }



    return (
        <View style={styles.container}>
            <TextInput style={{
                height: 40,
                borderColor: 'blue',
                borderWidth: 1,
                width: "30%"
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
            <FlatList
                data={obj}
                renderItem={({ item }) => (
                    <View key={item.name}>
                        <Text>{item.name + " " + item.label}</Text>
                    </View>
                )}
            />
        </View>



    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        width: "30%",
        margin: "1%"
    }
});
