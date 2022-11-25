import { StyleSheet, Text } from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";

import { useState, useContext, useEffect } from "react";
import SelectionModal from "./SelectionModal";
import ReasonModal from "./ReasonModal";
import QuantityModal from "./QuantityModal";
import UserContext from "../context/users/userContext";
import axios from "axios";
import { AcceptOrderRequest } from "../api";

const Modals = ({ setVisible, selectedOrder, navigation, storeKeeper }) => {
  const [changeQuantity, setChangeQuantity] = useState(false);
  const [reject, setReject] = useState(false);
  const [availableProduct, setAvailableProduct] = useState({});

  const hideModal = () => setVisible(false);
  const user = useContext(UserContext);

  const onAccept = async (defaultQuantity = true, quantity) => {
    const filteredProduct = storeKeeper.find(element => element.id === selectedOrder.products[0].id);

    const salesMenRequestQuantity = defaultQuantity ? selectedOrder.request_quantity : quantity;

    if (!filteredProduct || salesMenRequestQuantity > filteredProduct.pivot.quantity) {
      alert("Quantity not available");
      return;
    };

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.userState.token}`,
      },
    };

    const reqOptions = {
      quantity_accepted: salesMenRequestQuantity,
      status: "accepted",
      notes: "",
      location: "karachi"
    };

    try {
      const response = await axios.post(`${AcceptOrderRequest}${selectedOrder.id}/request`, reqOptions, headers);
      console.log(response);
      alert("Order Accepted");
      setVisible(false);

      navigation.navigate("Home")

    } catch (err) {
      console.log(err);
    };
  };

  const onReject = () => {
    setReject(!reject);
  };

  const onChangeQuantity = () => {
    changeQuantity ? setChangeQuantity(false) : setChangeQuantity(true);
  };

  useEffect(() => {
    const filteredProduct = storeKeeper.find(element => element.id === selectedOrder.products[0].id);

    setAvailableProduct(filteredProduct ? filteredProduct : {});
  }, []);

  return (
    <Provider>
      <Portal>
        <Modal
          visible={true}
          onDismiss={() => hideModal()}
          contentContainerStyle={styles.containerStyle}
        >
          <Text
            style={{
              position: "absolute",
              top: 5,
              right: 28,
              fontSize: 12,
              color:
                !availableProduct?.pivot?.quantity ? "red" :
                  availableProduct?.pivot?.quantity < selectedOrder.request_quantity ? "red" : "grey",
            }}
          >
            {
              reject ? null :
                `Available Quantity : ${availableProduct?.pivot?.quantity ? availableProduct.pivot.quantity : " 0"}`
            }
          </Text>
          {!reject && !changeQuantity && (
            <SelectionModal
              onAccept={onAccept}
              onReject={onReject}
              onChangeQuantity={onChangeQuantity}
            />
          )}
          {reject && (
            <ReasonModal
              selectedOrder={selectedOrder}
              onReject={onReject}
              onAccept={onAccept}
              navigation={navigation}
            />
          )}
          {changeQuantity && (
            <QuantityModal
              onChangeQuantity={onChangeQuantity}
              onAccept={onAccept}
            />
          )}
        </Modal>
      </Portal>
    </Provider>
  );
};

export default Modals;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 30,
  },
});
