import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OrderForm from './components/OrderForm'

const OrderRequest = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <OrderForm navigation={navigation} />
    </View>
  )
}

export default OrderRequest

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    backgroundColor: "#f8fff9",
    paddingTop: 20
    // height: '100%',
  }
})