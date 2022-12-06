import { useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  Animated,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import UserContext from "./context/users/userContext";


const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const user = useContext(UserContext);
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 2 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  // function handleBackButtonClick() {
  //   navigation.goBack();
  //   return true;
  // }

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
  //   };
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/logo.png")} style={styles.logo} />
      </View>
      <Animated.View
        style={[
          styles.footer,
          {
            // Bind opacity to animated value
            flex: fadeAnim,
          },
        ]}
      >
        <Text style={styles.title}>Welcome back to Ib</Text>
        <Text style={styles.title}> Sons!</Text>
        <Text style={styles.text}>Sign In with account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => {
            // console.log(user);

            navigation.navigate("Login")
          }}>
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: '50%',
    // height: 100,
  },
  footer: {
    flex: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
