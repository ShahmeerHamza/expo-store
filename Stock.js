import { useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    BackHandler,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StockTable from "./components/StockTable";
import NewStockTable from "./components/NewStockTable";
import axios from "axios";
import { api, StoreKeeperStockApi, viewSalesManStock } from "./api";
import UserContext from "./context/users/userContext";
import StoreKeeperContext from "./context/storeKeeper/storeKeeperContext";

const Stock = ({ navigation, route }) => {
    const [showModal, setShowModal] = useState(false);
    const [salesManStockData, setSalesManStockData] = useState(null);
    const [loading, setLoading] = useState(false);
    // console.log('data------------>', salesManStockData)

    const { _response } = api;
    const user = useContext(UserContext);
    const storeKeeper = useContext(StoreKeeperContext);

    // const stock_headings = [
    //     {
    //         heading1: "Product Name",
    //     },
    //     {
    //         heading2: "Quantity",
    //     },
    // ];

    // const products = [
    //     {
    //         date: "21-8-2022",
    //         productName: "product1",
    //         quantity: "50",
    //     },
    //     {
    //         date: "22-8-2022",
    //         productName: "product2",
    //         quantity: "65",
    //     },
    //     {
    //         date: "24-8-2022",
    //         productName: "product3",
    //         quantity: "70",
    //     },
    //     {
    //         date: "27-8-2022",
    //         productName: "product4",
    //         quantity: "40",
    //     },
    //     {
    //         date: "28-8-2022",
    //         productName: "product5",
    //         quantity: "60",
    //     },
    //     {
    //         date: "29-8-2022",
    //         productName: "product6",
    //         quantity: "70",
    //     },
    //     {
    //         date: "31-8-2022",
    //         productName: "product7",
    //         quantity: "90",
    //     },
    //     {
    //         date: "1-9-2022",
    //         productName: "product8",
    //         quantity: "50",
    //     },
    // ];

    const headers = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.userState.token}`,
        },
    };

    const getStoreKeeperStock = async () => {
        try {
            if (route.params === "storekeeper") {
                const response = await axios.get(
                    `${StoreKeeperStockApi}`,
                    headers
                );
                const { data } = _response(response);
                storeKeeper.setAssignedProducts(data);
                setLoading(false);
            } else {
                const response1 = await axios.get(viewSalesManStock, headers);
                const resData = _response(response1);
                setSalesManStockData(resData.data);
                // setSalesManStockData([...arrWithOutDuplicates]);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
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

    return (
        <>
            <ScrollView style={styles.container}>
                {route.params === "storekeeper" ? (
                    <>
                        {loading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size={35} />
                            </View>
                        ) : (
                            <NewStockTable data={storeKeeper.assignedProducts} />
                        )}
                    </>
                ) : (
                    <>
                        {loading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size={35} />
                            </View>
                        ) : (
                            <>
                                <View style={styles.button_container}>
                                    <TouchableOpacity
                                        style={styles.touchable}
                                        onPress={() => navigation.navigate("OrderRequest")}
                                    >
                                        <LinearGradient
                                            style={styles.button}
                                            colors={["#08d4c4", "#01ab9d"]}
                                        >
                                            <Text style={styles.textSign}>Order Product</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                                <NewStockTable data={salesManStockData} />
                            </>
                        )}
                    </>
                )}

                {/* <NewStockTable data={storeKeeper.assignedProducts} /> */}
            </ScrollView>
        </>
    );
};

export default Stock;

const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: Dimensions.get('window').height,
    },
    container: {
        // flex: 1,
        backgroundColor: "#f4f6fc",
        // alignItems: "center",
        // justifyContent: 'center',
    },

    button_container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6fc",
    },

    touchable: {
        flex: 1,
        height: 50,
        marginVertical: 30,
        marginHorizontal: 20,
    },

    button: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },

    textSign: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
});
