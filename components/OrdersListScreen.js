import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomerCard from "./CustomerCard";
import UserContext from "../context/users/userContext";
import axios from "axios";
import { myOrders } from "../api";

const OrdersListScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [ordersData, setOrdersData] = useState([]);

    const user = useContext(UserContext);

    const headers = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.userState.token}`,
        },
    };

    const getAllOrders = async () => {
        try {
            const response = await axios.get(myOrders, headers);
            setOrdersData(response.data.data.reverse());
            // console.log('response--------------------', response.data.data.reverse());
            setLoading(false);
        } catch (error) {
            console.log("error------------------------", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        getAllOrders();
    }, []);
    return (
        <>
            {loading && !ordersData?.length ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={35} />
                </View>
            ) : (
                <View style={styles.container}>
                    <FlatList
                        data={ordersData}
                        keyExtractor={(data) => data.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <CustomerCard order_Data={item} navigation={navigation} />}
                    />
                </View>
            )}
        </>

    )
}

export default OrdersListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fff9",
        justifyContent: "center",
        alignItems: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});