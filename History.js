import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HistoryTable from './components/HistoryTable'
import CustomerHistoryCard from './components/CustomerHistoryCard'

const History = () => {
    const [filterBtnStyleDeliver, setFilterBtnTextStyleDeliver] = useState({
        color: "#009387",
        backgroundColor: "transparent",
    })
    const [filterBtnStyleVisit, setFilterBtnTextStyleVisit] = useState({
        color: "#009387",
        backgroundColor: "transparent",
    })

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

    return (
        <View style={{padding: 15}}>
            <View style={styles.filiterBtnContainer}>
                <TouchableOpacity onPress={changeDeliverStyle} style={[styles.filterBtn, { backgroundColor: filterBtnStyleDeliver.backgroundColor }]}>
                    <Text style={{ color: filterBtnStyleDeliver.color }}>Delivered</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={changeVisitStyle} style={[styles.filterBtn, { backgroundColor: filterBtnStyleVisit.backgroundColor }]}>
                    <Text style={{ color: filterBtnStyleVisit.color }}>Visited</Text>
                </TouchableOpacity>
            </View>

            <View style={{height: 25}} />

            <FlatList
                data={customers}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <CustomerHistoryCard customer={item} />}
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
    }
})