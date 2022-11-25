import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import UserContext from "./context/users/userContext";
import axios from "axios";
import { createCustomerApi } from "./api";


export default function CreateCustomer({ navigation }) {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [screenLoading, setScreenLoading] = useState(false);

    const user = useContext(UserContext);

    const headers = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.userState.token}`,
        },
    };

    const handleCreateCustomer = async () => {
        setScreenLoading(true);
        setLoading(true);
        if (name === "") {
            alert("Please enter name");
            setScreenLoading(false);
            setLoading(false);
            return;
        } else if (number === null) {
            alert("Please enter number");
            setScreenLoading(false);
            setLoading(false);
            return;
        } else if (address === "") {
            alert("Please enter address");
            setScreenLoading(false);
            setLoading(false);
            return;
        } else {
            const createCustomerData = {
                name: name,
                phone: number,
                address: address,
            };
            try {
                const response = await axios.post(
                    createCustomerApi,
                    createCustomerData,
                    headers
                );
                console.log("response", response);
                setName("");
                setAddress("");
                setNumber(0);
                setScreenLoading(false);
                setLoading(false);
                navigation.navigate("Home");
            } catch (error) {
                console.log("error", error);
                setScreenLoading(false);
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            {screenLoading ? (
                <View
                    style={{
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator />
                </View>
            ) : (
                <>
                    <TextInput
                        placeholder="Name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(text) => setName(text)}
                    />
                    <TextInput
                        placeholder="Address"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(text) => setAddress(text)}
                    />
                    <TextInput
                        placeholder="Phone Number"
                        keyboardType="numeric"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(text) => setNumber(text)}
                    />
                    {/* <>
                            <Text style={{ fontSize: 17, color: "grey", marginVertical: 20, marginLeft: 5, fontWeight: '300', marginTop: 28 }}>
                                Product Name
                            </Text>
                            <ProductDropdown
                                data={data}
                                handleIdSelection={handleIdSelection}
                            />
                        </>
                        {!selectedProduct?.name ?
                            null : <Text style={styles.selectProductQuantity}>{`${selectedProduct.name} : ${quantity}`}</Text>}


                    
                        {
                            showQuantityField ?
                                <TextInput
                                    placeholder="Quantity"
                                    keyboardType='numeric'
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    defaultValue={0}
                                    onChangeText={text => setQuantity(text)}
                                    onBlur={() => {
                                        quantity === 0 ? null : (setShowQuantityField(false), getNameAndQty());
                                    }}
                                /> : null
                        } */}

                    <TouchableOpacity
                        onPress={() => {
                            // navigation.goBack();
                            handleCreateCustomer();
                        }}
                        style={styles.linear_button}
                    >
                        <LinearGradient
                            style={styles.linear}
                            colors={["#08d4c4", "#01ab9d"]}
                        >
                            <Text style={styles.button_text}>
                                {loading ? <ActivityIndicator /> : "Submit"}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    selectProductQuantity: {
        fontSize: 18,
        fontWeight: "400",
        marginTop: 28,
        marginLeft: 8,
        color: "grey",
        textTransform: "capitalize",
    },
    container: {
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    textInput: {
        borderBottomWidth: 1,
        marginTop: 30,
        paddingLeft: 5,
        paddingBottom: 5,
        borderBottomColor: "lightgrey",
        fontSize: 17,
    },
    linear_button: {
        width: "100%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        // margin: 10,
        marginTop: 100,
        overflow: "hidden",
    },
    linear: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    button_text: {
        color: "white",
    },
});
