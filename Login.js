import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';


export default function Login({ navigation }) {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [loginError, setLoginError] = useState("");

    var auth;

    function login() {

        console.log("Logging in");

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8080/login?username=" + username + "&password=" + password, requestOptions)
            .then(response => {
                if (!response.ok) {
                    setLoginError("Invalid user or password. Please try again.")
                } else {
                    response.text()
                    navigation.navigate("Two")
                }
            })
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
                padding: "4px",
                margin: "1%"
            }}
                onChangeText={setUsername}
                placeholder="username"
            />
            <TextInput style={{
                height: 40,
                borderColor: 'blue',
                borderWidth: 1,
                width: "30%",
                padding: "4px",
                marginBottom: "3%"
            }}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <View style={{ width: "30%", margin: "1%" }}>
                <Text style={{ textAlign: 'center' }}
                >{loginError}</Text>
                <Button
                    onPress={() => {
                        login();
                    }}
                    title="LOGIN"
                    color='#064420'
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4efe7',
        alignItems: 'center',
        justifyContent: 'center',
    },
});