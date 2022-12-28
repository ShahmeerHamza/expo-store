import { StyleSheet, Text, View } from "react-native";
import { Modal, Portal, Button, Provider } from "react-native-paper";

const Modal1 = ({ setVisible, pastOrder }) => {
    const hideModal = () => setVisible(false);

    console.log('pastOrder :>> ', pastOrder);

    return (
        <Provider>
            <Portal>
                <Modal
                    visible={true}
                    onDismiss={() => hideModal()}
                    contentContainerStyle={styles.containerStyle}
                >
                    <View style={{ flexDirection: "column", marginTop: -8 }}>
                        <Text
                            style={[
                                styles.containerTxt,
                                { textTransform: "uppercase", fontWeight: "600" },
                            ]}
                        >
                            Name :
                        </Text>
                        <Text
                            style={[
                                styles.containerTxt,
                                { textTransform: "capitalize", lineHeight: 18, marginBottom: 5, marginTop: -5 },
                            ]}
                        >
                            {pastOrder.salesman.name}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "column" }}>
                        <Text
                            style={[
                                styles.containerTxt,
                                { textTransform: "uppercase", fontWeight: "600" },
                            ]}
                        >
                            Number :
                        </Text>
                        <Text
                            style={[
                                styles.containerTxt,
                                { lineHeight: 18, marginBottom: 5, marginTop: -5 },
                            ]}
                        >
                            {pastOrder.salesman.phone}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "column" }}>
                        <Text
                            style={[
                                styles.containerTxt,
                                { textTransform: "uppercase", fontWeight: "600" },
                            ]}
                        >
                            Status :
                        </Text>
                        <Text
                            style={[
                                styles.containerTxt,
                                { textTransform: "capitalize", lineHeight: 18, marginBottom: 5, marginTop: -5 },
                            ]}
                        >
                            {pastOrder.pivot.status}
                        </Text>
                    </View>
                    {pastOrder.pivot.status === "rejected" ?
                        <View style={{ flexDirection: "column" }}>
                            <Text
                                style={[
                                    styles.containerTxt,
                                    { textTransform: "uppercase", fontWeight: "600" },
                                ]}
                            >
                                Reason :
                            </Text>
                            <Text
                                style={[
                                    styles.containerTxt,
                                    { textTransform: "capitalize", lineHeight: 18, marginBottom: 5, marginTop: -5 },
                                ]}
                            >
                                {pastOrder.pivot.notes}
                            </Text>
                        </View> : null
                    }

                </Modal>
            </Portal>
        </Provider>
    );
};

export default Modal1;

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 30,
        position: "absolute",
        top: 10,
        width: "90%",
        padding: 15,
        paddingBottom: 20,
        paddingTop: 20,
        // minHeight: 290,
        lineHeight: 30,
        paddingVertical: 23
    },
    containerTxt: {
        fontSize: 17,
        lineHeight: 45,
    },
});
