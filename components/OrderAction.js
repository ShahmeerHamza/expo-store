import React, { useState } from 'react';
import { Modal, Portal, Text, Button, Provider, } from 'react-native-paper';
import { StyleSheet, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';


const OrderAction = ({ setVisible }) => {
  const [changeQuantity, setChangeQuantity] = useState(false);
  const [reject, setReject] = useState(false);

  const hideModal = () => setVisible(false);

  const onconfirm = () => {
    alert('Order Accepted');
    setVisible(false);
  }

  const onchangequantity = () => {
    alert('Quantity Changed');
    setVisible(false);
  }

  return (
    <Provider>
      <Portal>
        <Modal visible={true} onDismiss={() => hideModal()} contentContainerStyle={styles.containerStyle}>
          {!reject ?
            <>
              <Image source={require('../assets/delivery-service.png')} />
              <View style={styles.container}>
                <TouchableOpacity style={styles.touchable} onPress={onconfirm}>
                  <View style={styles.button} colors={["#08d4c4", "#01ab9d"]}>
                    <Text style={styles.textSign}>Accept</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchable} onPress={() => setReject(true)}>
                  <View style={styles.button} colors={["#08d4c4", "#01ab9d"]}>
                    <Text style={styles.textSign}>Reject</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <TouchableOpacity style={styles.touchable} onPress={() => setChangeQuantity(true)}>
                  <LinearGradient style={styles.linear_button} colors={["#08d4c4", "#01ab9d"]}>
                    <Text style={styles.textLinear}>Change Quantity</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </> :
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.textReason}>Reason</Text>
              <TextInput numberOfLines={6} multiline={true} style={styles.inputReason} />
              <TouchableOpacity style={{
                height: 50,
                marginVertical: 30,
                marginHorizontal: 40,
              }} onPress={() => setReject(false)}>
                <LinearGradient style={[styles.linear_button]} colors={["#08d4c4", "#01ab9d"]}>
                  <Text style={styles.textLinear}>Submit</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          }
          {changeQuantity ?
            <View style={styles.inputContainer}>
              <TextInput keyboardType='numeric' style={styles.inputNum} />
              <TouchableOpacity style={styles.touchable} onPress={onchangequantity}>
                <LinearGradient style={styles.linear_button} colors={["#08d4c4", "#01ab9d"]}>
                  <Text style={styles.textLinear}>Confirm Quantity</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View> : null}
        </Modal>
      </Portal>
    </Provider>
  );
};

export default OrderAction;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#f8fff9',
    margin: 20,
    borderRadius: 30,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  touchable: {
    flex: 1,
    // height: 100,
    marginVertical: 30,
    marginHorizontal: 10,
  },

  button: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 1,
  },

  linear_button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // borderColor: 'black',
    // borderWidth: 1,
  },

  textSign: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  textLinear: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },


  textReason: {
    // flex: 1,
    fontSize: 24,
    marginLeft: 30,
    marginVertical: 20,
    // textAlign: 'center',
  },

  inputReason: {
    // flex: 1,
    fontSize: 20,
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 30,
    textAlign: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputNum: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 30,
    textAlign: 'center',
  }
})