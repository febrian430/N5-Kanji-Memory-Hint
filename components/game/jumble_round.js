import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Full } from '../horizontal_scroll'
import { Jumble } from '../../helper/repo'
import { FIELD, MODE } from '../const'


const SENTINEL_VALUE = "-1"

const WIDTH = Dimensions.get('window').width

const Slot = ({key, value, onPress, style, disabled}) => {
    let propStyle = style || []    

    var bgColor = "grey"
    var isSentinel = true
    if (value !== SENTINEL_VALUE){
        console.log(value)
        bgColor = "white"
        isSentinel = false
    }
    return (
        <TouchableOpacity 
            disabled={isSentinel || disabled} 
            onPress={onPress} 
            style={[{width: 200, height: 50, backgroundColor: bgColor}, ...propStyle]}
        >
            <Text style={[styles.selectText]}>{isSentinel ? "" : value}</Text>
        </TouchableOpacity>
    )
}

const Option = ({value, onPress, disabled, style}) => {
    let propStyle = style || []

    return (
        <TouchableOpacity 
            disabled={disabled} 
            onPress={onPress} 
            style={[{marginVertical: 8, justifyContent: "center"}, ...propStyle]}
        >
            <Text style={[styles.optionText]}>{value}</Text>
        </TouchableOpacity>
    )
}

//add disable delete and options when winning
//disable options if lose and not retryable
const JumbleRound = ({ question, options, answer, onFinish, retryable, index }) => {
    const isInitial = useRef(true)
    const [currentQuestion, setQuestion] = useState("")
    const [selected, setSelected] = useState([]) 
    const [currentOptions, setOptions] = useState([])
    const [counter, setCounter] = useState(0)
    const [currentAnswer, setAnswer] = useState([])
    const [gameOver, setGameOver] = useState(false)    

    useEffect(() => {
        setQuestion(question)
        setOptions(options)
        console.log(question)
        setAnswer(answer.split(''))
        setSelected(new Array(answer.length).fill({id: -1, value: SENTINEL_VALUE}))
    }, [])

    useEffect(() => {
        if(isInitial.current) {
            isInitial.current = false
        } else if (counter === currentAnswer.length) {   
            const isCorrect = checkAnswer()
            onFinish(isCorrect)

            if(isCorrect){
                setGameOver(true)
            }   
        }
    }, [counter])


    const firstAssignableIndex = () => {
        return selected.findIndex((item) => item.value === SENTINEL_VALUE)
    }

    const unselect = (...indexes) => {
        let unselect = selected
        indexes.forEach((index) => {
            unselect[index] = {id: SENTINEL_VALUE, value: SENTINEL_VALUE}
        })
        setSelected([...unselect])
        setCounter(counter - indexes.length)
        return indexes.length
    }

    const checkAnswer = () => {
        let wrongIndexes = diff(selected, currentAnswer)
        if(wrongIndexes.length !== 0) {
            unselect(...wrongIndexes)
            return false
        } else {
            return true    
        } 
    }

    const diff = (selects = [], target = []) => {
        let wrongIndexes = []
        target.forEach((value, index) => {
            if(value !== selects[index].value) {
                wrongIndexes.push(index)
            }
        })
        return wrongIndexes
    }

    const renderSelected = ({item, index}) => {
        return ( 
            <Slot 
                value={item.value} 
                style={[styles.selectBox]}
                onPress={() => slot.onPress(item, index)}
                disabled={gameOver}
            />
        )
    }

    const renderOptions = ({item, index}) => {
        return (
            <Option 
                key={item.id}
                value={item.value}
                style={[styles.optionBox]}
                onPress={() => option.onPress(item, index)} 
                disabled={selected.includes(item) || gameOver}
            />
        )
    }

    const slot = {
        onPress: (value, index) => {
            if(value !== SENTINEL_VALUE) {
                unselect(index)
            }
        }
    }


    const option = {
        onPress: (value) => {
            const index = firstAssignableIndex()
            if(index !== -1) {
                let newSelected = selected
                newSelected[index] = value
                setSelected([...newSelected])
                console.log("selected now: ", selected)
                setCounter(counter+1)
            }
        }
    }


    return (
        <Full style={[styles.container]}>
            <View style={[styles.question]}>
                <Text style={[styles.text ,{fontSize: 60}]}>{currentQuestion}</Text>
            </View>
            
            <View style={[styles.selects]}>
                <View>
                    <FlatList 
                        horizontal
                        listKey={`options ${index}`}
                        data={selected}
                        renderItem={renderSelected}
                        keyExtractor={(item,index) => `${index}`}
                        extraData={selected}
                        
                    />
                </View>
            </View>
            <View style={[styles.options, styles.list]}>
                {currentOptions.map((item, index) => {
                    return renderOptions({item: item, index: index})
                })}
            </View>
        </Full>
    )
}

export default JumbleRound

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        alignItems: 'center',
        alignContent: "center",
        justifyContent: "center",
        padding: 20
    },
    list: {
        // justifyContent: 'space-around',
        flexDirection: "column",
        flexWrap: "wrap",
        
        // alignItems: 'flex-start',
    },
    text: {
        textAlign: 'center',
        textAlignVertical: "center"
    },  
    question: {
        flex: 2,
        justifyContent: 'center',
        alignContent: "center",
        // backgroundColor: "blue"
    },
    selects: {
        flex: 1,
        // backgroundColor: "green"
    },
    options: {
        flex: 2,
        // backgroundColor: "red",
        justifyContent: "center",
        alignContent: "space-around",
        width: 300,
        marginBottom: 30
    },
    selectBox: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: "white"
    },
    selectText: {
        textAlign: 'center',
        textAlignVertical: "center",
        fontSize: 27
    },
    optionBox: {
        height: 60,
        width: 60,
        borderWidth: 1
    },  
    optionText: {
        textAlign: 'center',
        textAlignVertical: "center",
        fontSize: 30
    }
})