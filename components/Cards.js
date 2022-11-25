import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Cards = ({ image, title, route, token }) => {
  const navigation = useNavigation()
  return (
    <View style={[styles.card, styles.shadow]}>
      <TouchableOpacity onPress={() => navigation.navigate(route, token)}>
        <Image source={image} style={styles.image} />
        <Text style={styles.card_text}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Cards

const styles = StyleSheet.create({

  card: {
    padding: 20,
    maxHeight: 200,
    flex: 1,
    marginVertical: 10,
    backgroundColor: 'white',
    // marginVertical: 30,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },

  image: {
    margin: 20,
    width: 64,
    height: 64,
  },

  card_text: {
    textAlign: 'center',
    fontSize: 20,
  }

})