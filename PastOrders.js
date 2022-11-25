import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { OrdersApi } from "./api";
import OrderTable from "./components/OrderTable";
import { api } from "./api";

const PastOrders = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const [pastOrders, setPastOrders] = useState([]);
  const token = route.params;

  const { _response } = api;

  const getOrders = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(`${OrdersApi}?action=ar`, headers);
      const { data } = _response(response);

      setPastOrders(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getOrders();
  }, []);

  // const orders = [
  //   {
  //     date: '21-8-2021',
  //     productName: 'product81',
  //     quantity: '50'
  //   },
  //   {
  //     date: '22-8-2021',
  //     productName: 'product82',
  //     quantity: '65'
  //   },
  //   {
  //     date: '24-8-2021',
  //     productName: 'product83',
  //     quantity: '70'
  //   },
  //   {
  //     date: '27-8-2021',
  //     productName: 'product84',
  //     quantity: '40'
  //   },
  //   {
  //     date: '28-8-2021',
  //     productName: 'product85',
  //     quantity: '60'
  //   },
  //   {
  //     date: '29-8-2021',
  //     productName: 'product86',
  //     quantity: '70'
  //   },
  //   {
  //     date: '31-8-2021',
  //     productName: 'product87',
  //     quantity: '90'
  //   },
  //   {
  //     date: '1-9-2021',
  //     productName: 'product88',
  //     quantity: '50'
  //   },
  // ]

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={35} />
        </View>
      ) : (
        <>
          {pastOrders?.length ? (
            <View style={styles.container}>
              <OrderTable screen="pastOrders" data={pastOrders} />
            </View>
          ) : (
            <View style={[styles.container, { justifyContent: "center" }]}>
              <Text style={{ fontSize: 20 }}>No orders available</Text>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default PastOrders;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
  },

  image: {
    width: 200,
    height: 200,
  },
});
