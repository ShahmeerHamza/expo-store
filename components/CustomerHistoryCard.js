import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { DataTable } from 'react-native-paper';

const CustomerHistoryCard = ({ route }) => {
  //   const { name, address, contact, productName, quantity } = customer;

  const historyData = route.params.state
  console.log('historyData :>> ', historyData);

  return (
    <View style={styles.container1}>
      <Text style={styles.customerName}>{historyData.customer.name}</Text>
      <DataTable>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title
            textStyle={{
              color: "black",
              fontSize: 16,
            }}
            style={{
              flex: 1.5,
              justifyContent: "flex-start",

              // marginLeft: -9,
            }}
          >
            Product Name
          </DataTable.Title>

          <DataTable.Title
            textStyle={{
              color: "black",
              fontSize: 16,
            }}
            style={{
              flex: 1,
              justifyContent: "center",

              marginLeft: 10,
            }}
          >
            Qty
          </DataTable.Title>

          <DataTable.Title
            textStyle={{
              color: "black",
              fontSize: 16,
            }}
            style={{ flex: 1, justifyContent: "center", marginLeft: 15 }}
          >
            Status
          </DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={historyData.product_sale}
          keyExtractor={(data) => data.id}
          renderItem={({ item }) => (
            <DataTable.Row>
              <DataTable.Cell
                textStyle={{
                  color: item.status !== "delivered" ? "black" : "#009387",
                  fontSize: 16,
                  textTransform: "capitalize",
                }}
                style={{
                  flex: 1.5,
                  justifyContent: "flex-start",
                  // marginLeft: -3,
                }}
              >
                {item.product_id}
              </DataTable.Cell>
              <DataTable.Cell
                textStyle={{
                  color: item.status !== "delivered" ? "black" : "#009387",
                  fontSize: 16,
                }}
                style={{ flex: 1, justifyContent: "center", marginRight: 10 }}
              >
                {item.quantity}
              </DataTable.Cell>
              <DataTable.Cell
                textStyle={{
                  color: item.status !== "delivered" ? "black" : "#009387",
                  fontSize: 16,
                }}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  color: "#009387",
                }}
              >
                {item.status}
              </DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>
    </View>

    // <View style={styles.container}>

    //     <View style={styles.card_container}>
    //         <View style={styles.card_text}>
    //             <Text style={{ fontSize: 20, fontWeight: "bold", color: "#009387" }}>
    //                 {name}
    //             </Text>
    //             <View style={{ flexDirection: "row", marginTop: 2 }}>

    //                 <Image
    //                     style={{ width: 16, height: 16, resizeMode: "cover", tintColor: "#01ab9d" }}
    //                     source={require("../assets/pin.png")}
    //                 />

    //                 <Text style={{ marginTop: -3, paddingLeft: 5 }}>
    //                     {address}
    //                 </Text>
    //             </View>

    //             <View style={{ flexDirection: "row", marginTop: 2 }}>

    //                 <Image
    //                     style={{ width: 16, height: 16, resizeMode: "cover", tintColor: "#01ab9d" }}
    //                     source={require("../assets/contact-mail.png")}
    //                 />

    //                 <Text style={{ marginTop: -3, paddingLeft: 5 }}>
    //                     {contact}
    //                 </Text>
    //             </View>

    //             <View style={{ flexDirection: "row", marginTop: 2 }}>

    //                 {/* <Image
    //                     style={{ width: 14, height: 14, marginLeft: 2, resizeMode: "cover", tintColor: "#01ab9d" }}
    //                     source={require("../assets/box.png")}
    //                 /> */}

    //                 {/* <Text style={{ marginTop: -3, paddingLeft: 5 }}>
    //                     {productName}
    //                 </Text>
    //             </View>

    //             <View style={{ flexDirection: "row", marginTop: 2 }}>

    //                 <Image
    //                     style={{ width: 16, height: 16, resizeMode: "cover", tintColor: "#01ab9d" }}
    //                     source={require("../assets/product.png")}
    //                 />

    //                 <Text style={{ marginTop: -3, paddingLeft: 5 }}>
    //                     {quantity}
    //                 </Text> */}
    //             </View>

    //         </View>

    //     </View>
    // </View>
  );
};

export default CustomerHistoryCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: 5,
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
  customerName: {
    fontSize: 25,
    fontWeight: "500",
    marginVertical: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
