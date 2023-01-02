import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./SplashScreen";
import Login from "./Login";
import Home from "./Home";
import CurrentOrders from "./CurrentOrders";
import PastOrders from "./PastOrders";
import Modals from "./components/Modals";
import Stock from "./Stock";
import Customers from "./Customers";
import OrderRequest from "./OrderRequest";
import History from "./History";
import CreateCustomer from "./CreateCustomer";
import StockHistory from "./StockHistory";
import UsersState from './context/users/usersState';
import StoreKeeperState from './context/storeKeeper/StoreKeeperState';
import LogOut from "./components/LogOut";
import AssignProducts from './components/AssignProducts'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import OrdersListScreen from './components/OrdersListScreen';
import ProductAndQuantityOrderDetail from "./components/ProductAndQuantityOrderDetail";
import CustomerHistoryCard from './components/CustomerHistoryCard';
import StoreKeeperOrderTable from './components/StoreKeeperOrderTable';

export default function App() {
  const Stack = createNativeStackNavigator();

  // console.log('user', user)getOrdersUpdateState

  return (
    <UsersState>
      <StoreKeeperState>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#009387",
                alignItems: "center",
              },
            }}
          >
            {/* <Stack.Screen
              options={{
                title: "Welcome",
              }}
              name="Splash"
              component={SplashScreen}
            /> */}

            <Stack.Screen
              options={{
                title: "Let's Signin",
              }}
              name="Login"
              component={Login}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                title: "Home",
                headerLeft: () => <></>,
                headerRight: () => <LogOut navigation={navigation} />
              })}
              name="Home"
              component={Home}
            />

            <Stack.Screen
              options={{
                title: "Current Orders",
              }}
              name="CurrentOrders"
              component={CurrentOrders}

            />
            <Stack.Screen
              options={{
                title: "Orders details",
              }}
              name="StoreKeeperOrderTable"
              component={StoreKeeperOrderTable}

            />

            <Stack.Screen
              options={{
                title: "Past Orders",
              }}
              name="PastOrders"
              component={PastOrders}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                title: "Stock",
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("StockHistory")}
                    style={{ paddingTop: 5 }}
                  >
                    <Image
                      style={{ width: 26, height: 26 }}
                      source={require("./assets/clock.png")}
                    />
                  </TouchableOpacity>
                ),
              })}
              name="Stock"
              component={Stock}
            />

            <Stack.Screen
              options={{
                title: "Stock",
              }}
              name="StorekeeperStock"
              component={Stock}
            />

            <Stack.Screen
              options={{
                title: "Stock History",
              }}
              name="StockHistory"
              component={StockHistory}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                title: "Customers",
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("CreateCustomer")}
                    style={{ paddingTop: 4 }}
                  >
                    <Image
                      style={{ width: 25, height: 25 }}
                      source={require("./assets/user-avatar.png")}
                    />
                  </TouchableOpacity>
                ),
              })}
              name="Customers"
              component={Customers}
            />

            <Stack.Screen
              options={{
                title: "Create Customer",

              }}
              name="CreateCustomer"
              component={CreateCustomer}
            />
            {/* title: "Home",
                headerLeft: () => <></>, */}
            {/* headerRight: () => <LogOut navigation={navigation} /> */}

            <Stack.Screen
              options={{
                title: "Order Request",
              }}
              name="OrderRequest"
              component={OrderRequest}
            />

            <Stack.Screen
              options={() => ({
                title: "Create Order",
              })}
              name="AssignProducts"
              component={AssignProducts}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                title: "Orders",
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("AssignProducts")}>
                    <MaterialCommunityIcons name="plus"
                      size={30}
                      color="white" />
                  </TouchableOpacity>
                )
              })}
              name="OrdersScreen"
              component={OrdersListScreen}
            />

            <Stack.Screen
              options={{
                title: "Order Detail",
              }}
              name="ProductDetail"
              component={ProductAndQuantityOrderDetail}
            />

            <Stack.Screen
              options={{
                title: "History detail",
              }}
              name="Historydetail"
              component={CustomerHistoryCard}
            />

            <Stack.Screen
              options={{
                title: "History",
              }}
              name="History"
              component={History}
            />

            <Stack.Screen name="OrderAction" component={Modals} />
            {/* <Stack.Screen name='' component={OrderAction} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </StoreKeeperState>
    </UsersState>

  );
}

const styles = StyleSheet.create({});
