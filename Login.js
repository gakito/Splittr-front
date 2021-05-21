import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { FiUser, FiLock } from 'react-icons/fi'


export default function Login({ navigation }) {

    /**
     * @param username username inserted by the user
     * @param password  password inserted by the user
     * @param loginError a simple string to be shown only if a login error happens
     */
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [loginError, setLoginError] = useState("");

    function login() {

        console.log("Logging in");

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        //this gets a token from the server if the username and password are correct
        fetch("http://localhost:8080/login?username=" + username + "&password=" + password, requestOptions)
            .then(response => {
                //if it's not correct, return a simple message to the user
                if (!response.ok) {
                    setLoginError("Invalid user or password. Please try again.")
                } else {
                    response.text()
                        //the token got from the response is saved on sessionstorage, so it can be sent back to the server when is needed. the same is done with the username inserted.
                        .then(token => sessionStorage.setItem("token", token))
                        .then(() => sessionStorage.setItem("user", username))
                        .catch(error => console.log('error', error));
                    //command to go the next screen. this is here inside the fetch, so it only happens when the response is valid and user and password are correct
                    navigation.navigate("Two")
                }
            })

    }

    return (
        <View style={styles.container}>
            {/*this view is inserted so icon and Textinput can be side by side. This is done on other pages as well*/}
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
                    //the following atribute hides characters on the screen
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
            </View>
            <View style={styles.buttons}>
                <Text style={{ textAlign: 'center', paddingBottom: '1%' }}>{loginError}</Text>
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
        width: "45%",
        padding: "4px",
        backgroundColor: "#fdfaf6",
    },
    inputView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: "5px"
    },
    buttons: {
        width: "45%",
        margin: "2.5%",
        alignSelf: "center"
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