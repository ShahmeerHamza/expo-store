import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { intlFormatDistance } from "date-fns";
import React from "react";

const CustomerCard = ({
  order_Data,
  handleDeliver,
  handleVisit,
  navigation,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("ProductDetail", { state: order_Data })
      }
    >
      <View style={styles.card_container}>
        <View style={styles.card_text}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Customer Name</Text>
          {/* <Text style={{ position: "absolute", right: 10, top: 5 }}>{format(new Date(order_Data.created_at) - new Date(), "H:m")}</Text> */}
          <Text style={{ position: "absolute", right: 10, top: 5, color: "#009387", fontSize: 11 }}>
            {intlFormatDistance(new Date(order_Data.created_at), new Date())}
          </Text>
          <Text
            style={{
              fontSize: 17,
              marginBottom: 0,
              fontWeight: "500",
              marginLeft: 22,
              color: "#009387",
            }}
          >
            {order_Data.customer.name}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Details</Text>
          <View style={{ flexDirection: "row", marginTop: 2, marginLeft: 22 }}>
            <Image
              style={{ width: 16, height: 16 }}
              source={require("../assets/pin.png")}
            />

            <Text style={{ marginTop: -3, paddingLeft: 5 }}>
              {order_Data.customer.address}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 2, marginLeft: 22 }}>
            <Image
              style={{ width: 16, height: 16 }}
              source={require("../assets/contact-mail.png")}
            />

            <Text style={{ marginTop: -3, paddingLeft: 5 }}>
              {order_Data.customer.phone}
            </Text>
          </View>

          {/* <View style={{ flexDirection: "row", marginTop: 2 }}>

                        <Image
                            style={{ width: 14, height: 14, marginLeft: 2 }}
                            source={require("../assets/box.png")}
                        />

                        <Text style={{ marginTop: -3, paddingLeft: 5 }}>
                            {productName}
                            Mobile
                        </Text>
                    </View> */}

          {/* <View style={{ flexDirection: "row", marginTop: 2 }}>

                        <Image
                            style={{ width: 16, height: 16 }}
                            source={require("../assets/product.png")}
                        />

                        <Text style={{ marginTop: -3, paddingLeft: 5 }}>
                            50
                        </Text>
                    </View> */}
        </View>

        {/* <View style={styles.card_buttons}>
                    <TouchableOpacity style={styles.button} onPress={handleDeliver}>
                        <LinearGradient style={styles.linear_button} colors={["#08d4c4", "#01ab9d"]}>
                            <Text style={styles.button_text}>Deliver</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleVisit}>
                        <LinearGradient style={styles.linear_button} colors={["#08d4c4", "#01ab9d"]}>
                            <Text style={styles.button_text}>Visit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: 15,
    borderColor: "lightgrey",
    borderRadius: 20,
    borderWidth: 1,
    width: Dimensions.get("window").width * 0.9,
  },

  card_container: {
    // flex: 1,
    padding: 20,
    flexDirection: "row",
  },

  card_text: {
    flex: 2,
  },

  card_buttons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: "90%",
    borderRadius: 10,
  },

  linear_button: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
  },

  button_text: {
    color: "#fff",
  },
});
