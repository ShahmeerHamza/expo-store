import { StyleSheet, Text } from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";

import { useState, useContext, useEffect } from "react";
import SelectionModal from "./SelectionModal";
import ReasonModal from "./ReasonModal";
import QuantityModal from "./QuantityModal";
import UserContext from "../context/users/userContext";
import axios from "axios";
import { acceptOrderRequest } from "../api";

const Modals = ({ setVisible, selectedOrder, navigation, storeKeeper }) => {
  console.log('selectedOrder :>> ', selectedOrder);
  console.log('storeKeeper :>> ', storeKeeper);
  const [changeQuantity, setChangeQuantity] = useState(false);
  const [reject, setReject] = useState(false);
  const [availableProduct, setAvailableProduct] = useState({});
  const [acceptLoading, setAcceptLoading] = useState(false);

  const hideModal = () => setVisible(false);
  const user = useContext(UserContext);

  const onAccept = async (defaultQuantity = true, quantity) => {
    // console.log('quantity :>> ', quantity);
    console.log('defaultQuantity :>> ', defaultQuantity);
    setAcceptLoading(true)
    const filteredProduct = storeKeeper.find(element => element.product_id === selectedOrder.pivot.product_id);

    const salesMenRequestQuantity = defaultQuantity ? selectedOrder.pivot.request_quantity : quantity;

    if (!filteredProduct || salesMenRequestQuantity > filteredProduct.quantity) {
      alert("Quantity not available");
      setAcceptLoading(false)
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
      notes: "deny",
      product_id: selectedOrder.pivot.product_id
    };
    //   {
    //     "quantity_accepted" : 2,
    //     "status" :"accepted",
    //     "notes"  : "deny",
    //     "product_id" : 32

    // }

    console.log('selectedOrder.id :>> ', selectedOrder.id);

    try {
      const response = await axios.post(`${acceptOrderRequest}${selectedOrder.pivot.order_request_id}/request`, reqOptions, headers);
      console.log(response);
      alert("Order Accepted");
      setVisible(false);
      setAcceptLoading(false)
      navigation.navigate("Home")

    } catch (err) {
      console.log(err);
      setAcceptLoading(false)
    };
  };

  const onReject = () => {
    setReject(!reject);
  };

  const onChangeQuantity = () => {
    changeQuantity ? setChangeQuantity(false) : setChangeQuantity(true);
  };

  useEffect(() => {

    const filteredProduct = storeKeeper.find(element => element.product_id === selectedOrder.pivot.product_id);
    console.log('filteredProduct :>> ', filteredProduct);
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
                !availableProduct?.quantity ? "red" :
                  availableProduct?.quantity < selectedOrder.request_quantity ? "red" : "grey",
            }}
          >
            {
              reject ? null :
                `Available Quantity : ${availableProduct?.quantity ? availableProduct.quantity : " 0"}`
            }
          </Text>
          {!reject && !changeQuantity && (
            <SelectionModal
              onAccept={onAccept}
              onReject={onReject}
              onChangeQuantity={onChangeQuantity}
              acceptLoading={acceptLoading}
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
              acceptLoading={acceptLoading}
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
