import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  BackHandler,
  FlatList,
} from "react-native";
import { OrdersApi } from "./api";
import StoreKeeperOrderTable from "./components/StoreKeeperOrderTable";
import { api } from "./api";
import { useNavigation } from "@react-navigation/native";
import { DataTable } from "react-native-paper";
import { format } from "date-fns";
import Modal1 from "./components/Modal1";
import CustomerCard from './components/CustomerCard';

const PastOrders = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const [pastOrders, setPastOrders] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [visible1, setVisible1] = useState(false);
  const token = route.params;

  const { _response } = api;
  // console.log('pastOrders :>> ', pastOrders
  // );

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(`${OrdersApi}?action=ar`, headers);
      // const { data } = _response(response);

      setPastOrders(response.data.data);
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

  const navigation = useNavigation();

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
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
            <View style={styles.containerMain}>
              <FlatList
                data={pastOrders}
                keyExtractor={(data) => data.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  console.log('item. :>> ', item
                  );
                  return <CustomerCard
                    pastOrderAccepted={item}
                    navigation={navigation}
                    // modal={showModal}
                    screen="pastOrderScreen"
                  // storeKeeper={storeKeeper.assignedProducts}
                  />
                }}
              />

              {/* <StoreKeeperOrderTable screenPastOrder="pastOrders" data={pastOrders} /> */}
              {/* <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title
                    textStyle={{
                      color: "white",
                      fontSize: 16,
                    }}
                    style={{ flex: 2.3, justifyContent: "flex-start" }}
                  >
                    Date
                  </DataTable.Title>

                  <DataTable.Title
                    textStyle={{
                      color: "white",
                      fontSize: 16,
                    }}
                    style={{ flex: 2.5 }}
                  >
                    Name
                  </DataTable.Title>

                  <DataTable.Title
                    textStyle={{
                      color: "white",
                      fontSize: 16,
                    }}
                    style={{ flex: 3 }}
                  >
                    Product Name
                  </DataTable.Title>

                  <DataTable.Title
                    textStyle={{
                      color: "white",
                      fontSize: 16,
                    }}
                    style={{ flex: 1, justifyContent: "flex-end" }}
                  >
                    Qty
                  </DataTable.Title>
                </DataTable.Header>

                <FlatList
                  data={pastOrders}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <DataTable.Row
                        onPress={() => {
                          setVisible1(true);
                          setModalData(item);
                        }}
                      >
                        
                        <DataTable.Cell
                          style={{ flex: 2.3, justifyContent: "flex-start" }}
                        >
                          {format(new Date(item.updated_at), "dd-MMM-yy")}
                        </DataTable.Cell>
                        <DataTable.Cell
                          textStyle={{ textTransform: "capitalize" }}
                          style={{ flex: 2.5 }}
                        >
                          {item.salesman?.name}
                        </DataTable.Cell>
                        <DataTable.Cell
                          textStyle={{ textTransform: "capitalize" }}
                          style={{ flex: 3 }}
                        >
                          {item.products[0]?.name}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={{ flex: 1, justifyContent: "flex-end" }}
                        >
                          {item.accept_quantity}
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  }}
                />
              </DataTable> */}
            </View>
          ) : (
            <View style={[styles.container, { justifyContent: "center" }]}>
              <Text style={{ fontSize: 20 }}>No orders available</Text>
            </View>
          )}
          {visible1 ? (
            <Modal1 setVisible={setVisible1} pastOrder={modalData} />
          ) : null}
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
  containerMain: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
  },

  image: {
    width: 200,
    height: 200,
  },
  tableHeader: {
    backgroundColor: "#009387",
  },
});
