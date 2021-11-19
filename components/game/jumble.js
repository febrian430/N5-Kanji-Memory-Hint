import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ScrollView, Text, Touchable, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Screen from '../cmps/screen'
import { questionForJumble, optionsForJumble } from '../../helper/repo'
import { FIELD, MODE } from '../const'

const SENTINEL_VALUE = "-1"

const Slot = ({key, value, onPress}) => {
    var bgColor = "grey"
    var isSentinel = true
    if (value !== SENTINEL_VALUE){
        console.log(value)
        bgColor = "pink"
        isSentinel = false
    }
    return (
        <TouchableOpacity disabled={isSentinel} onPress={onPress} style={{width: 200, height: 50, backgroundColor: bgColor}}>
            <Text style={{textAlign: "center"}}>{key + isSentinel ? "" : value}</Text>
        </TouchableOpacity>
    )
}

const Option = ({value, onPress, disabled}) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{width: 200, height: 50, backgroundColor: "teal", marginVertical: 8}}>
            <Text style={{textAlign: "center"}}>{value}</Text>
        </TouchableOpacity>
    )
}


//@ts-check
const Jumble = ({navigation, route}) => {
    const isInitial = useRef(true)
    const [question, setQuestion] = useState({})
    const [selected, setSelected] = useState([]) 
    const [options, setOptions] = useState([])
    const [counter, setCounter] = useState(0)
    const [answer, setAnswer] = useState([])


    const mode = route.params.mode

    useEffect(() => {
        function getKeys(mode) {
            if(mode === MODE.IMAGE_MEANING) {
              return [FIELD.IMAGE, FIELD.RUNE]
            } else {
              return [FIELD.RUNE, FIELD.SPELLING]
            }
        }

        const [key1, key2] = getKeys(mode)

        const QNA = questionForJumble(key1, key2)
        setQuestion(QNA.question)
        setOptions(QNA.options)
        const answer = QNA.question.key.split('')
        setAnswer(answer)
        setSelected(new Array(answer.length).fill({id: -1, value: SENTINEL_VALUE}))
    }, [])

    useEffect(() => {
        if(isInitial.current) {
            isInitial.current = false
        } else if (counter === answer.length) {   
            checkAnswer()
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
        let wrongIndexes = diff(selected, answer)
        if(wrongIndexes.length !== 0) {
            alert("wrong")
            unselect(...wrongIndexes)
        } else {
            alert("correct")
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
                onPress={() => slot.onPress(item, index)}
            />
        )
    }

    const renderOptions = ({item, index}) => {
        return (
            <Option 
                value={item.value}
                onPress={() => option.onPress(item, index)} 
                disabled={selected.includes(item)}
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
        <Screen style={{flex: 1}}>

            <Text>{question.value}</Text>
            
            <View>
                <Text>SELECTED</Text>
                <FlatList 
                    data={selected}
                    renderItem={renderSelected}
                    keyExtractor={(item,index) => `${index}`}
                    extraData={selected}
                />
            </View>

                <ScrollView>
                    <Text>OPTIONS</Text>
                    <FlatList 
                        data={options}
                        renderItem={renderOptions}
                        keyExtractor={(item) => item.id}
                    />
                </ScrollView>
        </Screen>
    )
}

export default Jumble