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
import { FontAwesome } from "@expo/vector-icons";
// import { SelectList } from 'react-native-dropdown-select-list'
// import DropDownPicker from 'react-native-dropdown-picker'
import SelectList from "react-native-dropdown-select-list";
import ProductDropdown from "./ProductDropdown";
import { viewSalesManStock } from "./../api/index";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import getOrdersUpdateContext from "../context/GetOrdersUpdate/getOrdersUpdateContext";

const ProductAndQuantityOrderDetail = ({ route }) => {
    const [orderCollection, setOrderCollection] = useState([]);
    const [loading, setLoading] = useState(false);
    const [salesManStockData, setSalesManStockData] = useState([]);
    const [location, setLocation] = useState({});

    const isFocused = useIsFocused();

    // const [deliverLoading, setDeliverLoading] = useState(false);
    const order_ID = route.params.state;
    console.log('order_ID :>> ', order_ID);

    const navigation = useNavigation();
    // const putApi_ID = orderCollection.id;
    // console.log('putApi_ID', putApi_ID)
    // console.log("orderCollection", orderCollection);

    const user = useContext(UserContext);


    // const handleProductSelection = () => {

    // }

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
            setOrderCollection(response?.data?.data?.product_sale);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const viewSalesmanStock = async () => {
        try {
            const response1 = await axios.get(viewSalesManStock, headers);
            // const resData = _response(response1);
            setSalesManStockData(response1.data.data);
            // console.log('response1.data :>> ', response1.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getPermissionLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access location was denied");
            navigation.navigate("Home");
            return;
        }
        let { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;

        setLocation({
            latitude: latitude,
            longitude: longitude,
        });
    };

    // const UpdateOrdersData = useContext(getOrdersUpdateContext);


    const handleDeliver = async (id, prodId, qty) => {

        const findSalesmanStockData = salesManStockData.find(
            (item) => item.product.id === prodId
        );
        // console.log("findSalesmanStockData :>> ", findSalesmanStockData);

        // const findOrderCollection = orderCollection.find(item => item.id === id);

        if (qty > findSalesmanStockData?.quantity || !findSalesmanStockData) {
            alert("Quantity not available");
            return;
        } else {
            // await axios.put(`${orderMarkDeliver}${id}/delivered`, { status: "delivered" }, headers);

            fetch(`${orderMarkDeliver}${id}/delivered`, {
                // Adding method type
                method: "PUT",
                // Adding headers to the request
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${user.userState.token}`,
                },
                // Adding body to the request
                body: JSON.stringify({
                    status: "delivered",
                    longitude: location.longitude,
                    latitude: location.latitude,
                }),
            })
                // Converting to JSON
                .then((response) => response.json())

                // Displaying results to console
                .then((json) => {
                    console.log(json);
                    // setDeliverLoading(false)
                    getOrderCollection();

                    alert("Order Delivered");
                    // UpdateOrdersData.setUpdateData(true)
                })

                // Displaying error to console
                .catch((ex) => {
                    console.error(ex);
                    // setDeliverLoading(false);
                });
        }
    };


    const handleVisit = async (id) => {
        try {
            await axios.put(
                `${orderMarkDeliver}${id}/delivered`,
                {
                    status: "visited",
                    longitude: location.longitude,
                    latitude: location.latitude,
                },
                headers
            );
            alert("Order Visited");
            // UpdateOrdersData.setUpdateData(true)
            getOrderCollection()
            // navigation.navigate("Home")
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getPermissionLocation()
            setLoading(true);
            getOrderCollection();
            viewSalesmanStock();
        }
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
                                    flex: 0.4,
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
                                style={{ flex: 0.8, justifyContent: "center", marginLeft: 15 }}
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
                                Deliver
                            </DataTable.Title>
                            <DataTable.Title
                                textStyle={{
                                    color: "black",
                                    fontSize: 16,
                                }}
                                style={{ flex: 0.5, justifyContent: "center", marginRight: -9 }}
                            >
                                Visit
                            </DataTable.Title>
                        </DataTable.Header>

                        <FlatList
                            data={orderCollection}
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
                                            flex: 1.2,
                                            justifyContent: "flex-start",
                                            // marginLeft: -3,
                                        }}
                                    >
                                        {item.product.name}
                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        textStyle={{
                                            color: item.status !== "delivered" ? "black" : "#009387",
                                            fontSize: 16,
                                        }}
                                        style={{ flex: 0.5, justifyContent: "center" }}
                                    >
                                        {item.quantity}
                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        textStyle={{
                                            color: item.status !== "delivered" ? "black" : "#009387",
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
                                        {/* <TouchableOpacity onPress={() => (<View>
                                            <TouchableOpacity><Text>Deliver</Text></TouchableOpacity>
                                            <TouchableOpacity><Text>Visit</Text></TouchableOpacity>
                                        </View>)}>
                                            <FontAwesome name="chevron-down" size={12} color={'black'} />
                                        </TouchableOpacity> */}
                                        {item.status !== "delivered" ? (
                                            <TouchableOpacity
                                                style={{ borderRadius: 30 / 2, overflow: "hidden" }}
                                                onPress={() =>
                                                    handleDeliver(item.id, item.product.id, item.quantity)
                                                }
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
                                    <DataTable.Cell
                                        style={{
                                            flex: 0.5,
                                            justifyContent: "center",
                                            marginRight: -9,
                                        }}
                                    >
                                        {item.status === "delivered" ? null : (
                                            <>
                                                {item.status !== "visited" ? (
                                                    <TouchableOpacity
                                                        onPress={() => handleVisit(item.id)}
                                                        style={{ borderRadius: 30 / 2, overflow: "hidden" }}
                                                    >
                                                        <Image
                                                            style={styles.imgIcon}
                                                            source={require("../assets/4052241.png")}
                                                        />
                                                    </TouchableOpacity>
                                                ) : (
                                                    <Text style={{ color: "#009387" }}>visited</Text>
                                                )}
                                            </>
                                        )}
                                    </DataTable.Cell>
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
