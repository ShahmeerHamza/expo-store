import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import OrderTable from "./components/OrderTable";
import { api, OrdersApi, StoreKeeperStockApi } from "./api";
import axios from "axios";
import { useContext } from "react";
import UserContext from "./context/users/userContext";
import StoreKeeperContext from "./context/storeKeeper/storeKeeperContext";

const CurrentOrders = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [currentOrdersData, setCurrentOrdersData] = useState([]);
  // console.log("currentOrdersData", currentOrdersData);

  const user = useContext(UserContext);

  const storeKeeper = useContext(StoreKeeperContext);

  const { _response } = api;
  const token = route.params;

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getOrders = async () => {

    try {
      const response = await axios.get(OrdersApi, headers);
      const { data } = _response(response);
      setCurrentOrdersData(data);
      // console.log('data :>> ', data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getStoreKeeperStock = async () => {
    try {
      const response = await axios.get(
        `${StoreKeeperStockApi}`,
        headers
      );
      const { data } = _response(response);
      storeKeeper.setAssignedProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log('storeKeeper :>> ', storeKeeper);

  useEffect(() => {
    setLoading(true);
    getOrders();
    getStoreKeeperStock();
  }, []);

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

  // const orders = [
  //   {
  //     date: "21-8-2022",
  //     productName: "product1",
  //     quantity: "50",
  //   },
  //   {
  //     date: "22-8-2022",
  //     productName: "product2",
  //     quantity: "65",
  //   },
  //   {
  //     date: "24-8-2022",
  //     productName: "product3",
  //     quantity: "70",
  //   },
  //   {
  //     date: "27-8-2022",
  //     productName: "product4",
  //     quantity: "40",
  //   },
  //   {
  //     date: "28-8-2022",
  //     productName: "product5",
  //     quantity: "60",
  //   },
  //   {
  //     date: "29-8-2022",
  //     productName: "product6",
  //     quantity: "70",
  //   },
  //   {
  //     date: "31-8-2022",
  //     productName: "product7",
  //     quantity: "90",
  //   },
  //   {
  //     date: "1-9-2022",
  //     productName: "product8",
  //     quantity: "50",
  //   },
  // ];

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={35} />
        </View>
      ) : (
        <>
          {
            currentOrdersData?.length ?
              <View style={styles.container}>
                <OrderTable
                  storeKeeper={storeKeeper.assignedProducts}
                  modal={showModal}
                  navigation={navigation}
                  data={currentOrdersData}
                  screen="currentOrders"
                />
              </View> :
              <View style={[styles.container, { justifyContent: "center" }]}>
                <Text style={{ fontSize: 20 }}>No orders available</Text>
              </View>
          }
        </>
      )}
    </>
  );
};

export default CurrentOrders;

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