import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { FiUser, FiLock } from 'react-icons/fi'


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
                        .then(token => sessionStorage.setItem("token", token))
                        .then(() => sessionStorage.setItem("user", username))
                        .catch(error => console.log('error', error));
                    navigation.navigate("Two")
                }
            })

    }

    return (

        <View style={styles.container}>
            <View style={styles.inputView}>
                <View style={styles.icon}>
                    <FiUser
                        size="22px"
                    />
                </View>
                <TextInput style={styles.textInput}
                    onChangeText={setUsername}
                    placeholder="username"
                />
            </View>
            <View style={styles.inputView}>
                <View style={styles.icon}>
                    <FiLock
                        size="22px"
                    />
                </View>
                <TextInput style={styles.textInput}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    enablesReturnKeyAutomatically={true}
                />
            </View>
            <View style={{ width: "32%", margin: "2.5%", alignSelf: 'center' }}>
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
        justifyContent: 'center',
    },
    textInput: {
        height: 40,
        borderColor: '#064420',
        borderWidth: 1,
        width: "30%",
        padding: "4px",
        backgroundColor: "#fdfaf6",
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
    }
}
);