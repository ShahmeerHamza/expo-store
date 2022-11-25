import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import UserContext from '../context/users/userContext';

const LogOut = ({ navigation }) => {
    const user = useContext(UserContext);

    const showToast = () => {
        ToastAndroid.show("Logged Out!", ToastAndroid.SHORT);
    };

    const handleLogout = () => {

        user.setUserState({
            token: null,
            id: null,
            role_id: null,
            name: null,
            role: null,
            email: null,
            phone: null,
            avatar: null,
            email_verified_at: null,
            settings: [],
            created_at: null,
            updated_at: null
        });

        navigation.navigate("Login");

        showToast();

    };
    return (
        <>
            <TouchableOpacity onPress={handleLogout}>
                <MaterialCommunityIcons
                    name="logout"
                    size={24}
                    color="white"
                />
            </TouchableOpacity>
        </>
    )
}

export default LogOut

const styles = StyleSheet.create({})