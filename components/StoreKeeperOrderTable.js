import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { DataTable } from "react-native-paper";
import Modal1 from "./Modal1";
import Modals from "./Modals";

const StoreKeeperOrderTable = ({ route }) => {

    const {
        modal,
        storeKeeper,
        storeKeeperGetREquestOrder,
        screen,
        navigation,
        pastOrderAccepted,
    } = route?.params?.state;

    useEffect(() => {
        console.log('storeKeeperGetREquestOrder.product_get :>> ', storeKeeperGetREquestOrder);
        console.log('pastOrderAccepted.product_get :>> ', pastOrderAccepted);
    }, [])

    // { modal, data, heading, screen, navigation, storeKeeper }
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [pastOrder, setPastOrders] = useState({});
    const [selectedCurrentOrders, setSelectedCurrentOrders] = useState({});
    const [modalData, setModalData] = useState(null);
    // console.log('pastOrderAccepted.salesman :>> ', pastOrderAccepted.salesman);
    return (
        <>
            {storeKeeperGetREquestOrder?.product_get.length ||
                pastOrderAccepted?.product_get.length ? (
                <DataTable style={styles.container}>
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
                        data={
                            storeKeeperGetREquestOrder !== undefined
                                ? storeKeeperGetREquestOrder.product_get
                                : pastOrderAccepted.product_get
                        }
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => {
                            if (screen === "currentOrders" && item.pivot.status !== "pending") return;

                            return (
                                <DataTable.Row
                                    onPress={() => {
                                        if (screen === "currentOrders") {
                                            setSelectedCurrentOrders(item);
                                            setVisible(true);
                                        } else {
                                            console.log(item);
                                            setPastOrders({ ...item, salesman: { name: pastOrderAccepted?.salesman?.name, phone: pastOrderAccepted?.salesman?.phone } });
                                            setVisible1(true);
                                        }
                                    }}
                                >
                                    <DataTable.Cell
                                        style={{ flex: 2.3, justifyContent: "flex-start" }}
                                    >
                                        {screen === "currentOrders"
                                            ? format(new Date(item.created_at), "dd-MMM-yy")
                                            : format(new Date(item.created_at), "dd-MMM-yy")}
                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        textStyle={{ textTransform: "capitalize" }}
                                        style={{ flex: 2.5 }}
                                    >
                                        {screen === "currentOrders"
                                            ? storeKeeperGetREquestOrder.salesman?.name
                                            : pastOrderAccepted.salesman?.name}
                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        textStyle={{ textTransform: "capitalize" }}
                                        style={{ flex: 3 }}
                                    >
                                        {screen === "currentOrders" ? item.name : item.name}
                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        style={{ flex: 1, justifyContent: "flex-end" }}
                                    >
                                        {screen === "currentOrders"
                                            ? item.pivot.request_quantity
                                            : item.pivot.status === "rejected" ? item.pivot.request_quantity : item.pivot.accept_quantity
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
                            );
                        }}
                    />
                </DataTable>
            ) : (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Text style={{ fontSize: 20 }}>No order found</Text>
                </View>
            )}

            {/* //CurrentOrders Modal */}
            {visible ? (
                <Modals
                    storeKeeper={storeKeeper}
                    selectedOrder={selectedCurrentOrders}
                    navigation={navigation}
                    setVisible={setVisible}
                />
            ) : null}

            {/* //PastOrders Modal */}
            {visible1 ? (
                <Modal1 setVisible={setVisible1} pastOrder={pastOrder} />
            ) : null}
        </>
    );
};

export default StoreKeeperOrderTable;

const styles = StyleSheet.create({
    container: {
        // padding: 15,
    },
    tableHeader: {
        backgroundColor: "#009387",
    },
});
