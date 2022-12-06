import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Dimensions,
    ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import ProductDropdown from "./ProductDropdown";
import axios from "axios";
import {
    productDetailAdminApi,
    salesManPlaceOrderApi,
    assignedCutomerApi,
    ViewAllCustomerApi,
} from "../api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserContext from "../context/users/userContext";
import { RadioButton } from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';


const AssignProducts = ({ }) => {
    const navigation = useNavigation();

    const [selectedId, setSelectedId] = useState(0);
    const [data, setData] = useState([]);
    const [customerName, setCustomerName] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [status, setStatus] = useState('order');
    const [productQuantityCollection, setProductQuantityCollection] = useState([])
    const [location, setLocation] = useState({});
    // console.log('customerName', customerName)


    const isFocused = useIsFocused();

    const handleIdSelection = (id) => {
        setSelectedId(id);
    };

    const handleProductSelection = (id) => {
        const duplicate = selectedProduct.find((el) => {
            return el.key === id;
        });

        if (duplicate) {
            alert("cannot select more than one product");
            return;
        }

        const item = data.find((el) => {
            return el.key === id;
        });
        const temp = [...selectedProduct];
        temp.push(item);
        setSelectedProduct(temp);
    };

    const user = useContext(UserContext);

    const headers = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.userState.token}`,
        },
    };

    const onchangeInput = (val, id) => {
        let foundIndex = selectedProduct.findIndex(x => x.key === id);
        productQuantityCollection[foundIndex] = { pId: id, quantity: val };
        setProductQuantityCollection([...productQuantityCollection]);
    }

    const getPermissionLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            navigation.navigate("Home");
            return;
        }
        let { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;

        setLocation({
            latitude: latitude,
            longitude: longitude
        });
    }

    const handleRequestOrderSubmit = async () => {
        // console.log(selectedProduct);
        // console.log(productQuantityCollection);

        if (!location.longitude || !location.latitude) {
            getPermissionLocation();
            return;
        }

        setLoadingSubmit(true)
        if (status === "visit") {
            try {
                await axios.post(salesManPlaceOrderApi, {
                    customer_id: selectedId,
                    visit_status: status.toLocaleLowerCase(),
                    products: [],
                    longitude: location.longitude,
                    latitude: location.latitude,
                    deliver_date: new Date(),
                    order_status: null,
                    details: "dummy details"
                }, headers)
                setLoadingSubmit(false);
                alert("Visit successfully!");
                navigation.navigate("OrdersScreen");
            } catch (error) {
                console.log(error)
                alert("Failed")
                setLoadingSubmit(false);
            }

        } else if (status === "order") {
            if (selectedId === 0) {
                alert("Please select customer name!");
                setLoadingSubmit(false);
                return;
            } else if (!selectedProduct.length) {
                alert("Select product name");
                setLoadingSubmit(false)
                return;
            }
            else if (selectedProduct.length !== productQuantityCollection.length) {
                alert("Enter product quantity");
                setLoadingSubmit(false);
                return
            }
            else {
                try {
                    await axios.post(salesManPlaceOrderApi, {
                        customer_id: selectedId,
                        visit_status: status.toLocaleLowerCase(),
                        products: productQuantityCollection,
                        longitude: location.longitude,
                        latitude: location.latitude,
                        deliver_date: new Date(),
                        order_status: null,
                        details: "dummy details"
                    }, headers);
                    setLoadingSubmit(false);
                    alert("product successfully ordered");
                    navigation.navigate("Home");
                    console.log('productQuantityCollection', productQuantityCollection)

                } catch (error) {
                    console.log(error);
                    setLoadingSubmit(false);
                }
            }
        }


    };

    const getAllProduct = async () => {
        try {
            const response = await axios.get(ViewAllCustomerApi, headers);
            response.data.data?.reverse().forEach((element, index) => {
                customerName[index] = {
                    key: element.id,
                    value: element.name,
                };
            });
            setCustomerName([...customerName]);

            const response2 = await axios.get(productDetailAdminApi, headers);
            response2.data.data?.forEach((element, index) => {
                data[index] = {
                    key: element.id,
                    value: element.name,
                };
            });
            setData([...data]);

            setLoading(false);
            setError(false);
        } catch (error) {
            console.log("error", error);
            setLoading(false);
            setError(true);
        }
    };


    useEffect(() => {
        if (isFocused) {
            getPermissionLocation()
            setLoading(true);
            getAllProduct();
        };
    }, [isFocused]);

    const selectedProductDeleteHandler = (id) => {
        const newArr1 = productQuantityCollection.filter(item => item.pId !== id);
        setProductQuantityCollection(newArr1);

        const newArr = selectedProduct.filter(item => item.key !== id);
        setSelectedProduct(newArr);
    }

    return (
        <>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={35} />
                </View>
            ) : (
                <>
                    {error ? (
                        <Text>Error loading products please try again later</Text>
                    ) : data.length ? (
                        <ScrollView>
                            <View style={styles.container}>

                                <View style={styles.dropdown_container}>
                                    <Text style={{ fontSize: 20, marginVertical: 10, fontWeight: "500" }}>
                                        Customer Name
                                    </Text>
                                    <ProductDropdown
                                        data={customerName}
                                        handleIdSelection={handleIdSelection}
                                    />
                                </View>
                                <View style={{ flexDirection: "row", width: "100%", marginTop: 23 }}>
                                    <Text style={{ fontSize: 20, fontWeight: "500" }}>Status :</Text>
                                    <View style={{ flexDirection: "row", marginLeft: 15 }}>
                                        <Text style={{ fontSize: 18, marginTop: 3 }}>Order</Text>
                                        <RadioButton
                                            value="order"
                                            status={status === 'order' ? 'checked' : 'unchecked'}
                                            onPress={() => setStatus("order")}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", marginLeft: 15 }}>
                                        <Text style={{ fontSize: 18, marginTop: 3 }}>Visit</Text>

                                        <RadioButton
                                            value="visit"
                                            status={status === 'visit' ? 'checked' : 'unchecked'}
                                            onPress={() => setStatus("visit")}
                                        />
                                    </View>
                                </View>

                                {status === 'order' ? <>
                                    <View style={styles.dropdown_container}>
                                        <Text style={{ fontSize: 20, marginVertical: 10, fontWeight: "500" }}>
                                            Product Name
                                        </Text>
                                        <ProductDropdown
                                            data={data}
                                            handleIdSelection={handleProductSelection}
                                        />
                                    </View>


                                    {/* <FlatList
                                        data={selectedProduct}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item }) => { */}
                                    {selectedProduct.map((item, index) => {
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    width: (Dimensions.get("window").width / 100) * 70,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 17,
                                                        textTransform: "capitalize",
                                                        paddingTop: 8,
                                                    }}
                                                >
                                                    {item.value}
                                                </Text>
                                                <TextInput
                                                    style={{
                                                        width: "100%",
                                                        padding: 10,
                                                        borderBottomWidth: 1,
                                                        fontSize: 15,
                                                    }}
                                                    onChangeText={(val) => { onchangeInput(val, item.key) }}
                                                    placeholder={`Enter ${item.value} quantity`}
                                                    value={productQuantityCollection.find((e) => e?.pId === item.key)?.quantity}
                                                    keyboardType="numeric"
                                                />
                                                <TouchableOpacity
                                                    onPress={() => selectedProductDeleteHandler(item.key)}
                                                    style={{
                                                        width: 35,
                                                        height: "auto",
                                                        position: "absolute",
                                                        right: 7,
                                                        top: 25,
                                                    }}
                                                >
                                                    <MaterialCommunityIcons
                                                        name="delete"
                                                        size={29}
                                                        color="#01ab9d"
                                                        style={{}}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })


                                    }
                                    {/* }}
                                    /> */}


                                </> : null}


                                <TouchableOpacity
                                    onPress={handleRequestOrderSubmit}
                                    style={styles.linear_button}
                                >
                                    <LinearGradient
                                        style={styles.linear_button}
                                        colors={["#08d4c4", "#01ab9d"]}
                                    >
                                        <Text style={styles.button_text}>
                                            {loadingSubmit ? <ActivityIndicator /> : "Submit"}
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                    ) : (
                        <Text>No products found</Text>
                    )}
                </>
            )}
            <View style={{ width: "100%", height: "auto" }}>
            </View>

        </>
    );
};

export default AssignProducts;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "lightgrey",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 30,
        borderWidth: 1,
        margin: 20
    },

    dropdown_container: {
        marginVertical: 10,
        width: "100%",
    },

    input_container: {
        marginVertical: 20,
        width: "100%",
    },

    input_num: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "grey",
        borderWidth: 1,
        textAlign: "left",
        paddingLeft: 20,
        color: "black",
    },
    linear_button: {
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 20,
    },
    button_text: {
        color: "white",
    },
});


{/* <View>
    <Text
        style={{
            fontSize: 22,
            fontWeight: "500",
            paddingVertical: 15,
        }}
    >
        {selectedProduct.length ? "Selected Product" : null}
    </Text>
</View> */}