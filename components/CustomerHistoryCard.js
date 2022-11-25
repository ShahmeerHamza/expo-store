import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import React from 'react'


const CustomerHistoryCard = ({ customer }) => {
    const { name, address, contact, productName, quantity } = customer
    return (
        <View style={styles.container}>

            <View style={styles.card_container}>
                <View style={styles.card_text}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#009387" }}>
                        {name}
                    </Text>
                    <View style={{ flexDirection: "row", marginTop: 2 }}>

                        <Image
                            style={{ width: 16, height: 16, resizeMode: "cover", tintColor: "#01ab9d" }}
                            source={require("../assets/pin.png")}
                        />

                        <Text style={{ marginTop: -3, paddingLeft: 5 }}>
                            {address}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 2 }}>

                        <Image
                            style={{ width: 16, height: 16, resizeMode: "cover", tintColor: "#01ab9d" }}
                            source={require("../assets/contact-mail.png")}
                        />

                        <Text style={{ marginTop: -3, paddingLeft: 5 }}>
                            {contact}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 2 }}>

                        <Image
                            style={{ width: 14, height: 14, marginLeft: 2, resizeMode: "cover", tintColor: "#01ab9d" }}
                            source={require("../assets/box.png")}
                        />

                        <Text style={{ marginTop: -3, paddingLeft: 5 }}>
                            {productName}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 2 }}>

                        <Image
                            style={{ width: 16, height: 16, resizeMode: "cover", tintColor: "#01ab9d" }}
                            source={require("../assets/product.png")}
                        />

                        <Text style={{ marginTop: -3, paddingLeft: 5 }}>
                            {quantity}
                        </Text>
                    </View>

                </View>

            </View>
        </View>
    )
}

export default CustomerHistoryCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginVertical: 5,
        borderColor: 'lightgrey',
        borderRadius: 20,
        borderWidth: 1,
        width: Dimensions.get('window').width * 0.9,
    },

    card_container: {
        // flex: 1,
        padding: 20,
        flexDirection: 'row',
    },

    card_text: {
        flex: 2,
    },

    card_buttons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        width: "90%",
        borderRadius: 10,
    },

    linear_button: {
        width: '100%',
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 10,
    },

    button_text: {
        color: '#fff'
    },

})