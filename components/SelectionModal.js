import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SelectionModal = ({
  onAccept,
  onReject,
  onChangeQuantity,
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.deliveryImg}
        source={require("../assets/delivery.png")}
      />
      <Text style={styles.deliveryText}>Choose any option</Text>
      <Text style={styles.warning_text}>You won't be able to revert this!</Text>
      <View style={styles.options_container}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={onAccept}
        >
          <View style={styles.button}>
            <Text style={styles.textSign}>Accept</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={onReject}>
          <View style={styles.button}>
            <Text style={styles.textSign}>Reject</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.options_container}>
        <TouchableOpacity style={styles.touchable} onPress={onChangeQuantity}>
          <LinearGradient
            style={styles.linear_button}
            colors={["#08d4c4", "#01ab9d"]}
          >
            <Text style={styles.textLinear}>Change Quantity</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectionModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
  },

  deliveryImg: {
    marginBottom: 20,
  },

  deliveryText: {
    fontSize: 22,
  },
  warning_text: {
    margin: 20,
  },

  options_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  touchable: {
    flex: 1,
    // height: 100,
    marginVertical: 10,
    marginHorizontal: 5,
  },

  button: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderWidth: 1,
  },

  linear_button: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // borderColor: 'black',
    // borderWidth: 1,
  },

  textSign: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  textLinear: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});
