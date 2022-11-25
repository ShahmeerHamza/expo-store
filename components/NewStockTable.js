import { Image, StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React from "react";

export default function NewStockTable({ data }) {
    return (
        <View style={styles.dataTable}>
            {/* <FlatList
                showsVerticalScrollIndicator
                data={data}
                keyExtractor={(item) => (Number(item.id ? item.id : 2) * Math.random()).toString()}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.dataTableCell}>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    style={styles.dataTableCellImg}
                                    source={require("../assets/stock-market.png")}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={styles.headerTxt}>Product Name</Text>
                                    <Text style={styles.dataTableCellText}>
                                        {item.name ? item.name : item.products[0].name}
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
                    );
                }}
            />  */}
            {
                data?.map((item) => (
                    <View style={styles.dataTableCell}>
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                style={styles.dataTableCellImg}
                                source={require("../assets/stock-market.png")}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.headerTxt}>Product Name</Text>
                                <Text style={styles.dataTableCellText}>
                                    {item.name ? item.name : item.products[0].name}
                                </Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={styles.headerTxt}>Qty</Text>
                            <Text style={styles.dataTableCellQty}>
                                {/* {
                                        item.products[0].name === data[index - 1]?.products[0]?.name ?
                                            item.product_stock + data[index - 1].product_stock :
                                            item.product_stock
                                    } */}
                                {item?.pivot?.quantity
                                    ? item.pivot.quantity
                                    : item.product_stock}
                            </Text>
                        </View>
                    </View>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    headerTxt: {
        color: "#bfc5d2",
        fontSize: 14,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
    dataTable: {
        // alignItems: "center",
        marginTop: 25,
        paddingHorizontal: 15
    },
    dataTableCell: {
        width: Dimensions.get('window').width - 30,
        height: 85,
        backgroundColor: "#fff",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        justifyContent: "space-between",
        marginBottom: 15,
        // marginLeft: ((Dimensions.get('window').width) / 100) * 5,
        // marginRight: ((Dimensions.get('window').width) / 100) * 15,
        // marginHorizontal: ((Dimensions.get('window').width) / 100) * 5,
    },
    dataTableCellImg: {
        width: 42,
        height: 42,
    },
    dataTableCellText: {
        fontSize: 16,
        fontWeight: "600",
    },
    dataTableCellQty: {
        fontSize: 18,
        fontWeight: "700",
        color: "#009387",
    },
});
