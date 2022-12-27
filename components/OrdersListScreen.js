import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    BackHandler,
    Text
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomerCard from "./CustomerCard";
import UserContext from "../context/users/userContext";
import axios from "axios";
import { myOrders } from "../api";
import getOrdersUpdateContext from './../context/GetOrdersUpdate/getOrdersUpdateContext';
import { useIsFocused } from '@react-navigation/native';

const OrdersListScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [ordersData, setOrdersData] = useState([]);
    // console.log('ordersData', ordersData)

    const user = useContext(UserContext);
    const focused = useIsFocused();

    const headers = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.userState.token}`,
        },
    };

    // const UpdateOrdersData = useContext(getOrdersUpdateContext);

    const getAllOrders = async () => {
        // UpdateOrdersData.setUpdateData(false)
        try {
            const response = await axios.get(myOrders, headers);
            const filterData = response.data.data?.filter(({ visit_status }) => visit_status !== "visit")
            setOrdersData(filterData.reverse());
            // console.log('response--------------------', response.data.data.reverse());
            setLoading(false);
        } catch (error) {
            console.log("error------------------------", error);
            setLoading(false);
        }
    };

    useEffect(() => {

        if (focused) {
            setLoading(true);
            getAllOrders();
        }

    }, [focused]);


    function handleBackButtonClick() {
        navigation.goBack();
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    return (
        <>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={35} />
                </View>
            ) : (
                <View style={styles.container}>
                    {ordersData?.length ?
                        <FlatList
                            data={ordersData}
                            keyExtractor={(data) => data.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => <CustomerCard order_Data={item} navigation={navigation} screen="customerOrders" />}
                        /> :
                        <>
                            <View style={styles.container2}>
                                <Text style={{ fontSize: 20 }}>No orders available</Text>

                            </View>
                        </>}
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
    container2: {
        flex: 1,
        backgroundColor: "#f8fff9",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingHorizontal: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});