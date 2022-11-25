import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomerCard from "./components/CustomerCard";
import UserContext from "./context/users/userContext";
import axios from "axios";
import { salesManPlaceOrderApi, viewCustomerApi } from "./api";
import { Popover } from "react-native-popper";


const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [customersData, setCustomersData] = useState(null);
  const [error, setError] = useState(false);
  // console.log('customersData', customersData)

  const user = useContext(UserContext);

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${user.userState.token}`,
    },
  };

  const getAllCustomers = async () => {
    try {
      const response = await axios.get(viewCustomerApi, headers);
      // console.log('response--------------------', response);
      setCustomersData(response.data.data.reverse());
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log("error------------------------", error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllCustomers();
  }, []);

  // const handleDeliver = async (user) => {
  //   // console.log('user', user)
  //   try {
  //     const response = await axios.post(salesManPlaceOrderApi,)

  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }

  // const handleVisit = (data) => {
  //   // console.log('data.id', data.id)
  // }


  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={35} />
        </View>
      ) : (
        <>
          {
            error ? <View style={styles.container}>
              <Text>Error loading customers please try again later.</Text>
            </View> :
              customersData?.length ?
                <View style={styles.container}>
                  {/* <FlatList
                    data={customersData}
                    keyExtractor={(data) => data.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                      console.log('item', item)
                      return (
                        <View>
                          <View style={styles.dataTable}>
                            <View style={styles.dataTableCell}>
                              <View style={{ flexDirection: "row" }}>
                                <Image
                                  style={styles.dataTableCellImg}
                                  source={require("./assets/user.png")}
                                />
                                <View style={{ marginLeft: 10 }}>
                                  <Text style={styles.headerTxt}>Product Name</Text>
                                  <Text style={styles.dataTableCellText}>
                                    03202258996
                                  </Text>
                                </View>
                              </View>
                              <View style={{ alignItems: "flex-end" }}>
                                <Text style={styles.headerTxt}>Qty</Text>
                                <Text style={styles.dataTableCellQty}>

                                  {item?.pivot?.quantity
                                    ? item.pivot.quantity
                                    : item.product_stock}
                                </Text>
                              </View>
                            </View>

                          </View>
                        </View>
                      )
                    }}
                  /> */}
                  {/* <View style={styles.dataTable}> */}
                  {<FlatList
                    data={customersData}
                    keyExtractor={(data) => data.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                      // console.log('item', item)
                      return (
                        <View style={styles.dataTableCell}>
                          <View style={{ flexDirection: "row" }}>
                            <Image
                              style={styles.dataTableCellImg}
                              source={require("./assets/user.png")}
                            />
                            <View style={{ marginLeft: 10, marginTop: 8 }}>
                              <Text style={styles.headerTxt}>{item.name}</Text>
                              <Text style={styles.dataTableCellText}>
                                {item.phone}
                              </Text>
                            </View>
                          </View>

                          <Popover
                            placement="bottom left"
                            trigger={
                              <TouchableOpacity>
                                <Image
                                  style={{ height: 40, width: 42 }}
                                  source={require("./assets/map.png")}
                                />
                              </TouchableOpacity>
                            }
                          >
                            <Popover.Backdrop />
                            <Popover.Content>
                              <Text style={{ padding: 5, backgroundColor: "#707070", fontSize: 12, color: "white", borderRadius: 5, paddingHorizontal: 10, marginRight: 15, marginTop: 2 }}>{item.address}</Text>
                            </Popover.Content>
                          </Popover>

                        </View>

                      )
                    }}
                  />}
                  {/* </View> */}

                </View> :
                <View style={styles.container}>
                  <Text>No customers found</Text>
                </View>
          }
        </>
      )
      }
    </>
  );
};

export default Customers;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#f8fff9",
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 20,
    paddingHorizontal: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTxt: {
    color: "#344760",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  dataTable: {
    // alignItems: "center",
    // marginTop: 20,
    paddingHorizontal: 20,
    paddingHorizontal: 5,
  },
  dataTableCell: {
    // width: Dimensions.get('window').width - 30,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 10,
    // marginLeft: ((Dimensions.get('window').width) / 100) * 5,
    // marginRight: ((Dimensions.get('window').width) / 100) * 15,
    // marginHorizontal: ((Dimensions.get('window').width) / 100) * 5,
  },
  dataTableCellImg: {
    width: 60,
    height: 60,
  },
  dataTableCellText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#009387"
  },
  dataTableCellQty: {
    fontSize: 18,
    fontWeight: "700",
    color: "#009387",
  },
});
