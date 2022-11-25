import React from 'react';
import { useFormikContext } from 'formik';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from 'react-native';

function SubmitButton({ tittle, loading }) {
    const { handleSubmit } = useFormikContext();
    return (
        <TouchableOpacity onPress={handleSubmit}>
            <LinearGradient style={styles.signIn} colors={["#08d4c4", "#01ab9d"]}>
                {
                    loading ? <ActivityIndicator /> :
                        <Text style={styles.textSign}>{tittle}</Text>
                }
            </LinearGradient>
        </TouchableOpacity>
    );
}

export default SubmitButton;


const styles = StyleSheet.create({
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 60,
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
});
