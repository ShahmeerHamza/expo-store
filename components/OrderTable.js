import { format } from "date-fns";
import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import Modal1 from "./Modal1";
import Modals from "./Modals";

const OrderTable = ({ modal, data, heading, screen, navigation, storeKeeper }) => {
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [pastOrder, setPastOrders] = useState({});
    const [selectedCurrentOrders, setSelectedCurrentOrders] = useState({});
    // console.log('selectedCurrentOrders :>> ', selectedCurrentOrders);
    return (
        <>

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
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <DataTable.Row
                                onPress={() =>
                                    modal
                                        ? (setSelectedCurrentOrders(item), setVisible(true))
                                        : (setVisible1(true), setPastOrders(item))
                                }
                            >
                                <DataTable.Cell
                                    style={{ flex: 2.3, justifyContent: "flex-start" }}
                                >
                                    {screen === "currentOrders" ? format(new Date(item.created_at), "dd-MMM-yy") : format(new Date(item.updated_at), "dd-MMM-yy")}
                                </DataTable.Cell>
                                <DataTable.Cell textStyle={{ textTransform: "capitalize" }} style={{ flex: 2.5 }}>
                                    {item.salesman.name}
                                </DataTable.Cell>
                                <DataTable.Cell textStyle={{ textTransform: "capitalize" }} style={{ flex: 3 }}>
                                    {item.products[0].name}
                                </DataTable.Cell>
                                <DataTable.Cell style={{ flex: 1, justifyContent: "flex-end" }}>
                                    {screen === "currentOrders"
                                        ? item.request_quantity
                                        : item.accept_quantity}
                                </DataTable.Cell>
                            </DataTable.Row>
                        );
                    }}
                />
            </DataTable>

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

export default OrderTable;

const styles = StyleSheet.create({
    container: {
        // padding: 15,
    },
    tableHeader: {
        backgroundColor: "#009387",
    },
});
