import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default MenuButton = ({title, onPress, style}) => {
    if(!style) {
        style = []
    }
    return (
        <TouchableOpacity
            style={[styles.menuButton, styles.container, ...style]}
            onPress={onPress}
        >
            <Text style={[styles.menuButtonText]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    },  
    menuButton: {
        width: 220,
        height: 75,
        backgroundColor: "#0275d8",
        borderRadius: 5
    },
    menuButtonText: {
      color: "white",
      textAlign: "center",
      fontSize: 18
    }
})