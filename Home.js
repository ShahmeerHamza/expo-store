import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Cards from './components/Cards';
import newOrderLogo from "./assets/delivery-box.png"
import prevOrderLogo from "./assets/package.png"
import stockLogo from "./assets/warehouse.png"
import customerLogo from "./assets/man.png"
import orderProductLogo from "./assets/checklist.png"
import orderHistoryLogo from "./assets/order.png";
import { useContext } from 'react'
import UserContext from './context/users/userContext';


const Home = ({ navigation, route }) => {
  const user = useContext(UserContext);

  const newOrderTitle = 'New Orders'
  const prevOrderTitle = 'Previous Orders'


  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>{user.userState.role === 'storekeeper' ? "Dashboard" : "Salesmen Dashboard"}</Text>
      </View>

      <View style={styles.footer}>
        {user.userState.role === 'storekeeper' ?
          <>
            <View style={styles.card_container}>
              <Cards navigation={navigation} route={"StorekeeperStock"} token={"storekeeper"} image={stockLogo} title={'Stock'} />
            </View>

            <View style={styles.card_container}>
              <Cards navigation={navigation} route={"CurrentOrders"} token={user.userState.token} image={newOrderLogo} title={newOrderTitle} />
              <Cards navigation={navigation} route={"PastOrders"} token={user.userState.token} image={prevOrderLogo} title={prevOrderTitle} />
            </View>
          </> :
          <>
            <View style={styles.card_container}>
              <Cards navigation={navigation} route={"Stock"} image={stockLogo} title={'Stock'} />
              <Cards navigation={navigation} route={"Customers"} image={customerLogo} title={'Customers'} />
            </View>

            <View style={styles.card_container}>
              <Cards navigation={navigation} route={"OrdersScreen"} image={orderProductLogo} title={'Orders'} />
              <Cards navigation={navigation} route={"History"} image={orderHistoryLogo} title={'History'} />
            </View>
          </>
        }
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text_header: {
    color: '#fff',
    fontSize: 32,
  },

  footer: {
    flex: 2,
    backgroundColor: "#f8fff9",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    // alignItems: 'center',
  },

  card_container: {
    // flex: 1,
    flexDirection: 'row',
    width: '100%',
    // borderColor: '#000',
    // borderWidth: 1,
  },
});