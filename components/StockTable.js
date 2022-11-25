import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import Modals from './Modals';

const StockTable = ({ modal, data, heading }) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title textStyle={{
                        color: 'white',
                        fontSize: 20,
                    }} style={{ flex: 5, }}>Product Name</DataTable.Title>
                    <DataTable.Title textStyle={{
                        color: 'white',
                        fontSize: 20,
                    }} style={{ flex: 1, justifyContent: 'flex-end' }}>Qty</DataTable.Title>
                </DataTable.Header>
                {data?.map(
                    (item, index) => {
                        const { date, productName, quantity } = item;
                        return (
                            <DataTable.Row style={{ backgroundColor: (index % 2) !== 0 ? "#f5f5f5" : "white" }} key={index}>
                                {/* <DataTable.Cell style={{ flex: 3, justifyContent: 'flex-start' }}>{date}</DataTable.Cell> */}
                                <DataTable.Cell style={{ flex: 5 }}>{productName}</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 1, justifyContent: 'flex-end' }}>{quantity}</DataTable.Cell>
                            </DataTable.Row>
                        );
                    }
                )}
            </DataTable>

            {visible ? <Modals setVisible={setVisible} /> : null}
        </>
    );
};

export default StockTable;

const styles = StyleSheet.create({
    container: {
        // padding: 15,
    },
    tableHeader: {
        backgroundColor: '#009387',
    },
});