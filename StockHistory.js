import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HistoryTable from './components/HistoryTable'
import axios from 'axios'
import { api, myRequestStockHistory, OrdersApi } from './api'
import UserContext from './context/users/userContext'

const StockHistory = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const orders = [
        {
            date: '21-8-2022',
            productName: 'product1',
            quantity: '50',
            status: 'Pending'
        },
        {
            date: '22-8-2022',
            productName: 'product2',
            quantity: '65',
            status: 'Rejected'
        },
        {
            date: '24-8-2022',
            productName: 'product3',
            quantity: '70',
            status: 'Confirmed'
        },
        {
            date: '27-8-2022',
            productName: 'product4',
            quantity: '40',
            status: 'Confirmed'
        },
        {
            date: '28-8-2022',
            productName: 'product5',
            quantity: '60',
            status: 'Confirmed'
        },
        {
            date: '29-8-2022',
            productName: 'product6',
            quantity: '70',
            status: 'Rejected'
        },
        {
            date: '31-8-2022',
            productName: 'product7',
            quantity: '90',
            status: 'Rejected'
        },
        {
            date: '1-9-2022',
            productName: 'product8',
            quantity: '50',
            status: 'Confirmed'
        },
    ]

    const { _response } = api;
    const user = useContext(UserContext);

    const headers = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.userState.token}`,
        },
    };

    const getAllAcceptRejectPendingOrders = async () => {
        setLoading(true);
        let arr = [];

        try {
            const response1 = await axios.get(myRequestStockHistory, headers);
            // const response1Data = _response(response1).data;
            console.log('response1 ============:>> ', response1?.data?.data);

            setAllOrders(response1?.data?.data);
            setLoading(false);
        } catch (ex) {
            console.log(ex);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllAcceptRejectPendingOrders();
    }, []);
    console.log('allOrders', allOrders)

    return (
        <View>
            {
                loading ?
                    <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}><ActivityIndicator size={35} /></View> :
                    <HistoryTable data={allOrders} />
            }
        </View>
    )
}

export default StockHistory

const styles = StyleSheet.create({})