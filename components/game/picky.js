import React, { useEffect, useState } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import Draggable from './draggable'
import Screen from '../cmps/screen'
import { FIELD, JUMBLE, SCREEN } from '../const'
import { Distinct } from '../../helper/repo'
import { questionsForQuiz, optionsForQuiz } from "../../helper/repo"


const Picky = ({ navigation, route }) => {

    const [question, setQuestion] = useState({})
    const [options, setOptions] = useState([])

    useEffect(() => {
      const selectedChapters = [1]
      const q = questionsForQuiz(selectedChapters).slice(0,1)
      const o = optionsForQuiz(q[0], FIELD.RUNE)
      console.log(q,o)
      setQuestion(q[0])
      setOptions(o)
      console.log("FUCK YOU")
    }, [])


    const onDrop = (value, coordinate) => {
        if(coordinate.y > 350) {
          return JUMBLE.OUT_OF_DROPZONE
        }
        
        if(value === question.rune) {
          return JUMBLE.CORRECT
        } else {
          return JUMBLE.WRONG
        }
    }
    return (
        <Screen>
            <View style={styles.dropZone}>
                <Text style={styles.text}>{question.image}</Text>
            </View>
            <View style={styles.row}>
                {options.map((val) => {
                  return (<Draggable value={val} onDrop={onDrop} />)
                })}
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
      height: 100
    },
    row: {
      flex: 1,
      flexDirection: "row",
      // flexWrap: "wrap",
      justifyContent: "space-around"
    },  
    dropZone: {
      height: 300,
      backgroundColor: "#00334d",
      marginBottom: 100
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