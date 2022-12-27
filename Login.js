import { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";

import { api } from "./api/";
import AppForm from "./components/AppForm/AppForm";
import AppFormField from "./components/AppForm/FormField";
import SubmitButton from "./components/AppForm/SubmitButton";
import ErrorMessages from "./components/AppForm/ErrorMessage";
import UserContext from "./context/users/userContext";
import { useFormikContext } from "formik";

const Login = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [securePassword, setSecurePassword] = useState(true);
  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password"),
  });

  const { login } = api;
  const user = useContext(UserContext);
  // console.log('user.userState.token', user.userState.token)

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 2 seconds
    Animated.timing(fadeAnim, {
      toValue: 3,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  const handleLogin = async (userData, resetForm) => {
    setLoading(true);
    // console.log(userData);

    try {
      const res = await login({
        username: userData.email,
        password: userData.password,
        device_name: userData.device_name,
      });
      // console.log(res);

      if (res.status === 200) {


        user.setUserState({
          token: res.data.token,
          id: res.data.id,
          settings: res.data.settings,
          name: res.data?.name && null,
          role_id: res.data?.role_id && null,
          email: res.data?.email && null,
          phone: res.data?.phone && null,
          avatar: res.data?.avatar && null,
          email_verified_at: res.data?.email_verified_at && null,
          created_at: res.data.created_at,
          updated_at: res.data.updated_at,
          role: res.data.role_name
        })

        setLoading(false);
        navigation.navigate("Home");
        resetForm();
      } else {
        setIsUserNotFound(true);
        setLoading(false);
      }
    } catch (ex) {
      console.error(ex);
      setIsUserNotFound(true);
      setLoading(false);
    }
  };

  // if (user.userState.token) {
  //   navigation.navigate("Home");
  // }

  useEffect(() => {
    fadeIn();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
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
        <ScrollView
          style={{ paddingTop: 5 }}
          showsVerticalScrollIndicator={false}
        >
          <AppForm
            validationSchema={validationSchema}
            initialValues={{
              email: "store2@store.com",
              password: "testing123",
              device_name: "mobile",
            }}
            onSubmit={(values, { resetForm }) => handleLogin(values, resetForm)}
          >
            <Text style={styles.text_footer}>Email</Text>
            <View style={[styles.action, styles.shadow]}>
              <FontAwesome name="user" color="#009387" size={20} />
              <AppFormField
                placeholder=" Your Email"
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="email"
              />
            </View>
            <Text style={styles.text_footer}>Password</Text>
            <View style={[styles.action, styles.shadow]}>
              <FontAwesome name="lock" color="#009387" size={20} />
              <AppFormField
                placeholder=" Your Password"
                style={styles.textInput}
                secureTextEntry={securePassword}
                autoCapitalize="none"
                autoCorrect={false}
                name="password"
              />
              <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
                {securePassword ? (
                  <Ionicons name="eye" color="#009387" size={20} />
                ) : (
                  <Ionicons name="eye-off" color="#009387" size={20} />
                )}
              </TouchableOpacity>
            </View>

            <ErrorMessages
              style={{ marginTop: 10, marginLeft: 5 }}
              error={"Incorrect email or password. Please try again."}
              visible={isUserNotFound}
            />

            <SubmitButton tittle="Login" loading={loading} />
          </AppForm>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 1,
    backgroundColor: "#f8fff9",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    marginTop: 35,
    color: "#009387",
    fontSize: 18,
    marginBottom: 10,
  },
  action: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    // borderBottomWidth: 1,
  },

  shadow: {
    borderColor: "lightgrey",
    borderWidth: 1,
  },

  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    // marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#009387",
    // borderColor: 'black',
    // borderWidth: 1,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    // alignItems: 'center',
    // marginTop: 60,
    // width: '100%'
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 60,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
