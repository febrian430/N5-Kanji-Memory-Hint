import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ScrollView, Text, Touchable, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Screen from '../cmps/screen'
import { questionForJumble, optionsForJumble } from '../../helper/repo'

const SENTINEL_VALUE = "-1"

const Slot = ({key, value, onPress}) => {
    var bgColor = "grey"
    var isSentinel = true
    if (value !== SENTINEL_VALUE){
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

    useEffect(() => {
        const QNA = questionForJumble()
        setQuestion(QNA.question)
        setOptions(QNA.options)
        const answer = QNA.question.key.split('')
        setAnswer(answer)
        setSelected(new Array(answer.length).fill(SENTINEL_VALUE))
    }, [])

    useEffect(() => {
        if(isInitial.current) {
            isInitial.current = false
        } else if (counter === answer.length) {   
            checkAnswer()
        }
    }, [counter])

    const firstAssignableIndex = () => {
        return selected.findIndex((value) => value === SENTINEL_VALUE)
    }

    const unselect = (...indexes) => {
        let unselect = selected
        indexes.forEach((index) => {
            unselect[index] = SENTINEL_VALUE
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
            if(value !== selects[index]) {
                wrongIndexes.push(index)
            }
        })
        return wrongIndexes
    }

    const renderSelected = ({item, index}) => {
        return ( 
            <Slot 
                value={item} 
                onPress={() => slot.onPress(item, index)}
            />
        )
    }

    const renderOptions = ({item, index}) => {
        return (
            <Option 
                value={item}
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
                    keyExtractor={(item,index) => item+index}
                    extraData={selected}
                />
            </View>

                <ScrollView>
                    <Text>OPTIONS</Text>
                    <FlatList 
                        data={options}
                        renderItem={renderOptions}
                        keyExtractor={(item) => item}
                    />
                </ScrollView>
        </Screen>
    )
}

export default Jumble