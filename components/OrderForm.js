import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import ProductDropdown from "./ProductDropdown";
import UserContext from "../context/users/userContext";
import axios from "axios";
import { productDetailAdminApi, salesManRequestOrderApi } from "../api";

const OrderForm = ({ navigation }) => {
    const [productQuantity, setproductQuantity] = useState(0);
    const [selectedId, setSelectedId] = useState(0);
    const [data, setData] = useState([]);
    // const [dummyData, setDummyData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const handleIdSelection = (id) => {
        setSelectedId(id);
    };

    const user = useContext(UserContext);

    const headers = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.userState.token}`,
        },
    };

    const handleRequestOrderSubmit = async () => {
        setLoadingSubmit(true);
        // const selectedProduct = dummyData?.find(
        //     (element) => element.id === selectedId
        // );

        if (!selectedId) {
            alert("Please select product!");
            setLoadingSubmit(false);
            return;
        } else if (!productQuantity) {
            setLoadingSubmit(false);
            return alert("Enter product quantity!");
        }
        //  else if (selectedProduct?.quantity < productQuantity) {
        //     alert("selected quantity not available!");
        //     setLoadingSubmit(false);
        //     return;
        // }
        else {
            try {
                await axios.post(
                    salesManRequestOrderApi,
                    {
                        product_id: selectedId,
                        quantity: productQuantity,
                    },
                    headers
                );
                setLoadingSubmit(false);
                alert("product successfully requested");
                navigation.navigate("Home");
            } catch (error) {
                console.log(error);
                setLoadingSubmit(false);
            }
        }
    };

    const getAllProduct = async () => {
        try {
            const response = await axios.get(productDetailAdminApi, headers);

            // setDummyData(response.data.data);

            response.data.data?.forEach((element, index) => {
                data[index] = {
                    key: element.id,
                    value: element.name,
                };
            });

            setData([...data]);
            setLoading(false)
        } catch (error) {
            console.log("error", error);
            setLoading(false)
        }
    };

    useEffect(() => {
        setLoading(true)
        getAllProduct();
    }, []);

    return (
        <>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={35} />
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={styles.dropdown_container}>
                        <Text style={{ fontSize: 20, marginVertical: 20 }}>
                            Product Name
                        </Text>
                        <ProductDropdown
                            data={data}
                            handleIdSelection={handleIdSelection}
                        />
                    </View>

                    <View style={styles.input_container}>
                        <Text style={{ fontSize: 20, marginVertical: 20 }}>
                            Product Quantity
                        </Text>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="0"
                            style={styles.input_num}
                            onChangeText={(text) => setproductQuantity(text)}
                        />
                    </View>

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
            )}
        </>
    );
};

export default OrderForm;

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
    },

    dropdown_container: {
        marginVertical: 20,
        width: "100%",
    },

    input_container: {
        marginVertical: 20,
        width: "100%",
    },

    input_num: {
        // flex: 1,
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "grey",
        borderWidth: 1,
        // marginHorizontal: 40,
        textAlign: "left",
        // marginVertical: 20,
        paddingLeft: 20,
        // padding: 15,
        color: "black",
    },
    linear_button: {
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 10,
    },
    button_text: {
        color: "white",
    },
});
