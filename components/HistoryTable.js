import { format } from "date-fns";
import { FlatList, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

const HistoryTable = ({ modal, data, heading }) => {
    return (
        <>
            <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title
                        textStyle={{
                            color: "white",
                            fontSize: 20,
                        }}
                        style={{ flex: 4, justifyContent: "flex-start" }}
                    >
                        Date
                    </DataTable.Title>
                    <DataTable.Title
                        textStyle={{
                            color: "white",
                            fontSize: 20,
                        }}
                        style={{ flex: 6 }}
                    >
                        Product Name
                    </DataTable.Title>
                    <DataTable.Title
                        textStyle={{
                            color: "white",
                            fontSize: 20,
                        }}
                        style={{ flex: 3, justifyContent: "center" }}
                    >
                        Status
                    </DataTable.Title>
                    <DataTable.Title
                        textStyle={{
                            color: "white",
                            fontSize: 20,
                        }}
                        style={{ flex: 2, justifyContent: "flex-end" }}
                    >
                        Qty
                    </DataTable.Title>
                </DataTable.Header>

                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <DataTable.Row>
                                <DataTable.Cell
                                    style={{ flex: 4, justifyContent: "flex-start" }}
                                >
                                    {item.status === "accepted" ? format(new Date(item.salesman.updated_at), "dd-MMM-yy") : format(new Date(item.created_at), "dd-MMM-yy")}
                                </DataTable.Cell>
                                <DataTable.Cell textStyle={{ textTransform: "capitalize" }} style={{ flex: 6 }}>
                                    {item?.products[0]?.name}
                                </DataTable.Cell>
                                <DataTable.Cell textStyle={{ textTransform: "capitalize" }} style={{ flex: 3, justifyContent: "center" }}>
                                    {item.status}
                                </DataTable.Cell>
                                <DataTable.Cell style={{ flex: 2, justifyContent: "flex-end" }}>
                                    {item?.accept_quantity}
                                </DataTable.Cell>
                            </DataTable.Row>
                        );
                    }}
                />
                {/* {data?.map(
                    (item, index) => {
                        return (
                            <DataTable.Row key={index}>
                                <DataTable.Cell style={{ flex: 4, justifyContent: 'flex-start' }}>{format(new Date(item.created_at), "dd-MMM-yy")}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 6 }}>{item?.products[0]?.name}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 3, justifyContent: 'center' }}>{item.status}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 2, justifyContent: 'flex-end' }}>{item.status === "pending" ? item.request_quantity : item.status === "accepted" ? item.accept_quantity : 0}</DataTable.Cell>
                            </DataTable.Row>
                        );
                    }
                )} */}
            </DataTable>
        </>
    );
};

export default HistoryTable;

const styles = StyleSheet.create({
    container: {
        // padding: 15,
    },
    tableHeader: {
        backgroundColor: "#009387",
    },
});
