import React from "react";
import { StyleSheet, Text } from "react-native";


function ErrorMessages({ error, visible, style }) {
    if (!visible || !error) return null;

    return <Text style={[styles.error, style]}>{error}</Text>;
}

const styles = StyleSheet.create({
    error: { color: "red" },
});

export default ErrorMessages;
