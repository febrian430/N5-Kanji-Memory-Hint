import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Draggable from './draggable'
import Screen from '../cmps/screen'

const Picky = () => {

    const onDropCorrect = (value, coordinate) => {
        if(coordinate.y < 200) {
            return 1
        } else {
            return -1
        }
    }

    const onDropFalse = (value, coordinate) => {
        if(coordinate.y < 200) {
            return 0
        } else {
            return -1
        }
    }

    return (
        <Screen>
            <View style={styles.dropZone}>
                <Text style={styles.text}>Drop them here!</Text>
            </View>
            <View style={styles.ballContainer} />
            <View style={styles.row}>
                <Draggable value="asd" onDrop={onDropCorrect} />
                <Draggable value="def" onDrop={onDropFalse} />
                <Draggable value="ghi" onDrop={onDropCorrect} />
                <Draggable value="jkl" onDrop={onDropFalse} />
                <Draggable value="mno" onDrop={onDropCorrect} />
            </View>
      </Screen>
    )
}

export default Picky

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1
    },
    ballContainer: {
      height:200
    },
    row: {
      flexDirection: "row"
    },  
    dropZone: {
      height: 100,
      backgroundColor: "#00334d"
    },
    text: {
      marginTop: 25,
      marginLeft: 5,
      marginRight: 5,
      textAlign: "center",
      color: "#fff",
      fontSize: 25,
      fontWeight: "bold"
    }
  });