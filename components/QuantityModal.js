import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const QuantityModal = ({ onChangeQuantity, onAccept }) => {
  const [changeQuantityInput, setChangeQuantityInput] = useState(0);
  // console.log('changeQuantityInput------------------------->', changeQuantityInput)

  return (
    <View style={styles.container}>
      <Text style={styles.container_heading}>Change Quantity</Text>
      <View style={styles.inputContainer}>
        <TextInput keyboardType="numeric" style={styles.inputNum}
          onChangeText={text => setChangeQuantityInput(text)} />
      </View>
      <View style={styles.button_container}>
        <TouchableOpacity style={styles.touchable} onPress={() => onAccept(false, changeQuantityInput)}>
          <LinearGradient
            style={styles.linear_button}
            colors={["#08d4c4", "#01ab9d"]}
          >
            <Text style={styles.textLinear}>Confirm Quantity & Accept</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.touchable, styles.linear_button]}
          onPress={onChangeQuantity}
        >
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuantityModal;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: "center",
  },

  container_heading: {
    fontSize: 24,
  },

  inputContainer: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    margin: 20,
  },

  button_container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  inputNum: {
    // flex: 1,
    width: "90%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginHorizontal: 40,
    textAlign: "center",
  },

  touchable: {
    width: "100%",
  },

  linear_button: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  textLinear: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },

  text: {
    fontSize: 14,
  },
});
