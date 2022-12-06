import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from 'axios';
import { acceptOrderRequest } from './../api/index';
import UserContext from "../context/users/userContext";

const ReasonModal = ({ onReject, selectedOrder, navigation }) => {
  const [reasonInput, setReasonInput] = useState("");

  const user = useContext(UserContext);

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.userState.token}`,
    },
  };

  const handleReject = async () => {
    if (reasonInput === "") {
      alert("Please Enter reason");
      return;
    }

    const reqOptions = {
      quantity_accepted: 0,
      status: "rejected",
      notes: reasonInput,
      location: "karachi"
    };

    try {
      // alert("working")
      const response = await axios.post(`${acceptOrderRequest}${selectedOrder.id}/request`, reqOptions, headers);
      console.log(response);

      alert("Product Rejected!");
      navigation.navigate("Home")
      // onReject();
    } catch (err) {
      console.log(err);
    };
  };


  return (
    <View>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.textReason}>Enter your reason</Text>
        <TextInput
          numberOfLines={6}
          multiline={true}
          style={styles.inputReason}
          onChangeText={(text) => setReasonInput(text)}
        />

        <View style={styles.button_container}>
          <TouchableOpacity
            style={{
              height: 50,
              marginTop: 30,
              marginHorizontal: 40,
            }}
            onPress={handleReject}
          >
            <LinearGradient
              style={[styles.linear_button]}
              colors={["#08d4c4", "#01ab9d"]}
            >
              <Text style={styles.textLinear}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.linear_button,
              {
                height: 50,
                marginVertical: 5,
                // marginHorizontal: 40,
              },
            ]}
            onPress={onReject}
          >
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReasonModal;

const styles = StyleSheet.create({
  textReason: {
    fontSize: 24,
    marginLeft: 30,
    marginVertical: 20,
  },

  inputReason: {
    fontSize: 20,
    backgroundColor: "#fff",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 30,
    paddingLeft: 5,
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
    color: "#000",
    fontSize: 14,
  },
});
