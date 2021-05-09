import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';


export default function Login({ navigation }) {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    var auth;

    function login() {

        console.log("Logging in");

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/login?username=" + username + "&password=" + password, requestOptions)
            .then(response => response.text())
            .then(token => sessionStorage.setItem("token", token))
            .then(() => sessionStorage.setItem("user", username))
            .catch(error => console.log('error', error));
    }

    return (

        <View style={styles.container}>
            <TextInput style={{
                height: 40,
                borderColor: 'blue',
                borderWidth: 1,
                width: "30%",
                padding: "4px"
            }}
                onChangeText={setUsername}
                placeholder="username"
            />
            <TextInput style={{
                height: 40,
                borderColor: 'blue',
                borderWidth: 1,
                width: "30%",
                padding: "4px"
            }}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <View style={{ width: "30%" }}>
                <Button
                    onPress={() => {
                        login();
                        navigation.navigate("Two");
                    }}
                    title="LOGIN"
                /></View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});