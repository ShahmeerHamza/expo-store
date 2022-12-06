import { BackHandler, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HistoryTable from './components/HistoryTable'
import CustomerHistoryCard from './components/CustomerHistoryCard'
import { useNavigation } from '@react-navigation/native';
import { myHistory } from './api';
import UserContext from './context/users/userContext';
import axios from 'axios';
import { formatDistance } from "date-fns";


const History = () => {
    const [filterBtnStyleDeliver, setFilterBtnTextStyleDeliver] = useState({
        color: "#009387",
        backgroundColor: "transparent",
    })
    const [filterBtnStyleVisit, setFilterBtnTextStyleVisit] = useState({
        color: "#009387",
        backgroundColor: "transparent",
    })
    const [historyData, setHistoryData] = useState([]);
    const [visitedData, setVisitedData] = useState([]);
    const [deliveredData, setDeliveredData] = useState([]);
    const [showDeliverData, setShowDeliverDAta] = useState(true);
    // const [showVisitedData, setVisitedData] = (false)
    // const visible

    const customers = [
        {
            name: 'Khalid',
            address: 'Street No.9, Korangi No. 4, Karachi, Pakistan',
            contact: '+92 3118339853',
            productName: 'product1',
            quantity: '40'
        },

        {
            name: 'Muzammil',
            address: 'Street No.2, Gulistan e Johar No. 4, Karachi, Pakistan',
            contact: '+92 3077954339',
            productName: 'product4',
            quantity: '75'
        },
        {
            name: 'Usman',
            address: 'Street No.1, Saddar, Karachi, Pakistan',
            contact: '+92 3473458329',
            productName: 'product9',
            quantity: '60'
        },
        {
            name: 'Hamza',
            address: 'Street No.11, Korangi No. 4, Karachi, Pakistan',
            contact: '+92 3118339853',
            productName: 'product7',
            quantity: '20'
        },
        {
            name: 'Saif',
            address: 'Street No.9, Nazimabad No. 4, Karachi, Pakistan',
            contact: '+92 3110345690',
            productName: 'product1',
            quantity: '4'
        },
        {
            name: 'Talha',
            address: 'Street No.9, Sarjani No. 4, Karachi, Pakistan',
            contact: '+92 3442804683',
            productName: 'product2',
            quantity: '2'
        },
        {
            name: 'kabeer',
            address: 'Street No.9, Gulshan e Tqbal No. 1, Karachi, Pakistan',
            contact: '+92 3160235789',
            productName: 'product12',
            quantity: '40'
        },
        {
            name: 'Daniyal',
            address: 'Street No.16, Mammar No. 4, Karachi, Pakistan',
            contact: '+92 3199955240',
            productName: 'product18',
            quantity: '40'
        },
        {
            name: 'Muazzan',
            address: 'Street No.3, Laloukheet No. 4, Karachi, Pakistan',
            contact: '+92 3116854790',
            productName: 'product13',
            quantity: '40'
        },
        {
            name: 'Kaseem',
            address: 'Street No.6, Lasbela No. 4, Karachi, Pakistan',
            contact: '+92 3118339853',
            productName: 'product3',
            quantity: '40'
        },
        {
            name: 'Kabeer',
            address: 'Street No.1, Nazimabad No. 4, Karachi, Pakistan',
            contact: '+92 3118339853',
            productName: 'product1',
            quantity: '40'
        },
        {
            name: 'Ahsan',
            address: 'Street No.7, Crossing, Karachi, Pakistan',
            contact: '+92 3118339853',
            productName: 'product1',
            quantity: '40'
        },
    ];

    const changeDeliverStyle = () => {
        // setVisitedData(false)
        setShowDeliverDAta(true)
        setFilterBtnTextStyleDeliver({
            backgroundColor:
                filterBtnStyleDeliver.backgroundColor === "#009387" ? "transparent" : "#009387",
            color:
                filterBtnStyleDeliver.color === "#fff" ? "#009387" : "#fff",
        });

        setFilterBtnTextStyleVisit({
            backgroundColor:
                "transparent",
            color:
                "#009387"
        });
    };

    const changeVisitStyle = () => {
        setShowDeliverDAta(false)
        // setVisitedData(true)
        setFilterBtnTextStyleVisit({
            backgroundColor:
                filterBtnStyleVisit.backgroundColor === "#009387" ? "transparent" : "#009387",
            color:
                filterBtnStyleVisit.color === "#fff" ? "#009387" : "#fff",
        })

        setFilterBtnTextStyleDeliver({
            backgroundColor:
                "transparent",
            color:
                "#009387"
        });
    };

    const navigation = useNavigation();

    function handleBackButtonClick() {
        navigation.goBack();
        return true;
    }

    const user = useContext(UserContext);

    const headers = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.userState.token}`,
        },
    };

    const getSalesmanHistoryData = async () => {
        try {
            const response = await axios.get(myHistory, headers);
            // console.log('response', response?.data.data.completed_orders)
            setDeliveredData(response.data.data.completed_orders.reverse());
            setVisitedData(response?.data?.data?.visited.reverse());
            // console.log('visitedData :>> ', deliveredData);



        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getSalesmanHistoryData()
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    return (
        <View style={{ padding: 15 }}>
            <View style={styles.filiterBtnContainer}>
                <TouchableOpacity onPress={changeDeliverStyle} style={[styles.filterBtn, { backgroundColor: filterBtnStyleDeliver.backgroundColor }]}>
                    <Text style={{ color: filterBtnStyleDeliver.color }}>Delivered</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={changeVisitStyle} style={[styles.filterBtn, { backgroundColor: filterBtnStyleVisit.backgroundColor }]}>
                    <Text style={{ color: filterBtnStyleVisit.color }}>Visited</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 25 }} />

            <FlatList
                data={showDeliverData ? deliveredData : visitedData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    // <CustomerHistoryCard customer={item} />

                    <TouchableOpacity
                        style={styles.container}
                        onPress={() =>
                            navigation.navigate("Historydetail", { state: item })
                        }
                    >
                        <View style={styles.card_container}>
                            <View style={styles.card_text}>
                                <Text style={{ fontSize: 18, fontWeight: "500" }}>Customer Name</Text>
                                {/* <Text style={{ position: "absolute", right: 10, top: 5 }}>{format(new Date(order_Data.created_at) - new Date(), "H:m")}</Text> */}
                                <Text style={{ position: "absolute", right: 10, top: 5, color: "#009387", fontSize: 11 }}>
                                    {formatDistance(new Date(item.created_at), new Date())}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        marginBottom: 0,
                                        fontWeight: "500",
                                        marginLeft: 22,
                                        color: "#009387",
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {item.customer.name}
                                </Text>
                                <Text style={{ fontSize: 18, fontWeight: "500" }}>Details</Text>
                                <View style={{ flexDirection: "row", marginTop: 2, marginLeft: 22 }}>
                                    <Image
                                        style={{ width: 16, height: 16 }}
                                        source={require("./assets/pin.png")}
                                    />

                                    <Text style={{ marginTop: -3, paddingLeft: 5, textTransform: "capitalize", }}>
                                        {item.customer.address}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", marginTop: 2, marginLeft: 22 }}>
                                    <Image
                                        style={{ width: 16, height: 16 }}
                                        source={require("./assets/contact-mail.png")}
                                    />

                                    <Text style={{ marginTop: -3, paddingLeft: 5 }}>
                                        {item.customer.phone}
                                    </Text>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default History

const styles = StyleSheet.create({
    filiterBtnContainer: {
        flexDirection: 'row'
    },
    filterBtn: {
        borderColor: "#009387",
        borderWidth: 1,
        marginRight: 15,
        height: 30,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    container: {
        backgroundColor: "#fff",
        marginVertical: 15,
        borderColor: "lightgrey",
        borderRadius: 20,
        borderWidth: 1,
        width: Dimensions.get("window").width * 0.9,
    },

    card_container: {
        // flex: 1,
        padding: 20,
        flexDirection: "row",
    },

    card_text: {
        flex: 2,
    },

    card_buttons: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        width: "90%",
        borderRadius: 10,
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
        color: "#fff",
    },
})