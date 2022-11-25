import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import UserContext from "./../context/users/userContext";
import { orderMarkDeliver, specificOrder } from "../api";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const ProductAndQuantityOrderDetail = ({ route }) => {
    const [orderCollection, setOrderCollection] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [deliverLoading, setDeliverLoading] = useState(false);
    const order_ID = route.params.state;
    const putApi_ID = orderCollection.id;
    // console.log('putApi_ID', putApi_ID)
    // console.log("orderCollection", orderCollection);

    const user = useContext(UserContext);

    const headers = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.userState.token}`,
        },
    };

    const getOrderCollection = async () => {
        try {
            const response = await axios.get(
                `${specificOrder}${order_ID.id}`,
                headers
            );
            setLoading(false);
            // console.log('response', response.data.data.product_sale);
            setOrderCollection(response.data.data.product_sale);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleDeliver = async (id) => {
        // setDeliverLoading(true)
        // console.log("Product", id);
        // const findProduct = orderCollection.product_sale.find(
        //     (item) => item.id === id
        // );
        // console.log("checkProduct", findProduct);

        // console.log(user.userState.token);
        // try {
        //     const res = await axios.put(
        //         `${orderMarkDeliver}${id}/delivered`,
        //         headers
        //     );

        //     console.log(res);
        //     alert("Product Delivered!");
        // } catch (error) {
        //     console.log(error);
        // }

        // PUT request using fetch()
        fetch(`${orderMarkDeliver}${id}/delivered`, {
            // Adding method type
            method: "PUT",

            // Adding headers to the request
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${user.userState.token}`,
            },
        })
            // Converting to JSON
            .then((response) => response.json())

            // Displaying results to console
            .then((json) => {
                console.log(json);
                // setDeliverLoading(false)
                getOrderCollection();
            })

            // Displaying error to console
            .catch((ex) => {
                console.error(ex);
                // setDeliverLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        getOrderCollection();
    }, []);
    return (
        <>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={35} />
                </View>
            ) : (
                <View style={styles.container1}>
                    <Text style={styles.customerName}>{order_ID?.customer.name}</Text>
                    <DataTable>
                        <DataTable.Header style={styles.tableHeader}>
                            <DataTable.Title
                                textStyle={{
                                    color: "black",
                                    fontSize: 16,
                                }}
                                style={{
                                    flex: 1.2,
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
                                    flex: 0.5,
                                    justifyContent: "center",
                                    justifyContent: "center",
                                }}
                            >
                                Qty
                            </DataTable.Title>

                            <DataTable.Title
                                textStyle={{
                                    color: "black",
                                    fontSize: 16,
                                }}
                                style={{ flex: 0.8, justifyContent: "center" }}
                            >
                                Status
                            </DataTable.Title>
                            <DataTable.Title
                                textStyle={{
                                    color: "black",
                                    fontSize: 16,
                                }}
                                style={{ flex: 0.8, justifyContent: "flex-end" }}
                            >
                                Action
                            </DataTable.Title>
                            {/* <DataTable.Title
                        textStyle={{
                            color: "black",
                            fontSize: 16,
                        }}
                        style={{ flex: 0.5, justifyContent: "center", marginRight: -9 }}
                    >
                        Visit
                    </DataTable.Title> */}
                        </DataTable.Header>

                        <FlatList
                            data={orderCollection}
                            keyExtractor={(data) => data.id}
                            renderItem={({ item }) => (
                                <DataTable.Row>
                                    <DataTable.Cell
                                        textStyle={{
                                            color:
                                                item.status === "pending" ? "black" : "#009387",
                                            fontSize: 16,
                                            textTransform: "capitalize"
                                        }}
                                        style={{
                                            flex: 1.2,
                                            justifyContent: "flex-start",
                                            // marginLeft: -3,
                                            justifyContent: "flex-start",

                                        }}
                                    >
                                        {item.product.name}
                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        textStyle={{
                                            color:
                                                item.status === "pending" ? "black" : "#009387",
                                            fontSize: 16,
                                        }}
                                        style={{ flex: 0.5, justifyContent: "center" }}
                                    >
                                        {item.quantity}
                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        textStyle={{
                                            color: item.status === "pending" ? "black" : "#009387",
                                            fontSize: 16,
                                        }}
                                        style={{
                                            flex: 0.8,
                                            justifyContent: "center",
                                            color: "#009387",
                                        }}
                                    >
                                        {item.status}
                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        style={{ flex: 0.6, justifyContent: "flex-end" }}
                                    >
                                        {item.status === "pending" ? (
                                            <TouchableOpacity
                                                style={{ borderRadius: 30 / 2, overflow: "hidden" }}
                                                onPress={() => handleDeliver(item.id)}
                                            >
                                                <Image
                                                    style={styles.imgIcon}
                                                    source={require("../assets/approved.png")}
                                                />
                                            </TouchableOpacity>
                                        ) : (
                                            <Ionicons name="md-checkmark" size={30} color="#009387" />
                                        )}
                                    </DataTable.Cell>
                                    {/* <DataTable.Cell
                                style={{ flex: 0.5, justifyContent: "center", marginRight: -9 }}
                            >
                                <TouchableOpacity
                                    style={{ borderRadius: 30 / 2, overflow: "hidden" }}
                                >
                                    <Image
                                        style={styles.imgIcon}
                                        source={require("../assets/4052241.png")}
                                    />
                                </TouchableOpacity>
                            </DataTable.Cell> */}
                                </DataTable.Row>
                            )}
                        />
                    </DataTable>
                </View>
            )}
        </>
    );
};

export default ProductAndQuantityOrderDetail;

const styles = StyleSheet.create({
    container1: {
        width: "94%",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "lightgrey",
        backgroundColor: "#fff",
        borderRadius: 15,
        // padding: 30,
        borderWidth: 1,
        margin: 10,
        paddingBottom: 10,
    },
    customerName: {
        fontSize: 25,
        fontWeight: "500",
        marginVertical: 15,
    },
    imgIcon: {
        width: 30,
        height: 30,
        borderwidth: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
