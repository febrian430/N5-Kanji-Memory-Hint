import React, { useEffect, useRef, useState } from "react"
import { Fragment } from "react"
import { Dimensions, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import Kanji from "../../assets/data/kanji.json"
import shuffle from "../../helpers/shuffler"
import { HorizontalScroll, Full } from "../horizontal_scroll"


const width = Dimensions.get('window').width;

const Question = ({value}) => {
    return <Text style={[styles.title]}>{value}</Text>
}

const Option = ({value, onPress, backgroundColor, color }) => {
    console.log([backgroundColor])
    return (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, color]}>
                {value}
            </Text>
        </TouchableOpacity>
    )
}

// const Options = ({source, onPress}) => {
    
//     return (
//         source.map((option, index) => {
//             return (
//                 <Option key={index} value={option} onPress={onPress} />
//             )
//         })
//     )
// }

const Round = ({question, options, renderOptions, data}) => {

    return (
        <Full>
        {/* <View style={styles.full}> */}
            <View>
                <Question value={question.name} />
            </View>

            <FlatList
                data={options}
                renderItem={renderOptions}
                keyExtractor={(item) => item}
                extraData={data}
            />
        {/* </View> */}
        </Full> 
    )
}
//make individual selected q and a, when user wanna go back or next, set to null or reset
export default MultipleChoiceGame = () => {

    const [current, setCurrent] = useState(0)
    const isInitial = useRef(true)

    const [QAs, setQAs] = useState([])
    const [question, setQuestion] = useState(null)
    const [options, setOptions] = useState(null)
    const [score, setScore] = useState(0)
    const [selectedOptions, setSelectedOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)  

    useEffect(() => {
        const source = Kanji.kanji_collection
        const questionSource = shuffle(source)
        const optionSource = source.map((option) => {
            return option.meaning
        })
        
        const questions = questionSource.slice(0, 10)
        const qnas = questions.map((question) => {
            const otherOptionCandidates = optionSource.filter((meaning) => meaning !== question.meaning).slice(0, 3)
            let options = shuffle([question.meaning, ...otherOptionCandidates])
            return { question: question, options: options }
        })
        setQAs(qnas)
        setQuestion(qnas[0].question)
    }, [])

    const nextQuestion = () => {
        if(current < (QAs.length-1)) {
            setCurrent(current+1)
        } else {
            alert(`You got ${score} questions right`)
        }   
    }

    useEffect(() => {
        if(isInitial.current){
            isInitial.current = false
        } else {
            console.log("next question")
            nextQuestion()
        }
    }, [selectedOptions])

    const getOptionColorConfig = (option) => {
        let color = "black"
        let backgroundColor = "white"
        if(selectedOptions[current] === option) {
            backgroundColor = "red"
            color = "white"
        }
        if(selectedOptions[current] !== undefined && option === QAs[current].question.meaning) {
            backgroundColor = "green"
            color = "white"
        }
        return { color, backgroundColor }
    }

    const evaluateSelected = (option) => {
        if(QAs[current].question.meaning === option) {
            setScore(score+1)
        }
        setSelectedOption(option)
        setSelectedOptions([...selectedOptions, option])
    }

    const renderOptions = ({ item, index }) => {
        console.log(`index: ${index} current: ${current}`)
        var {backgroundColor, color} = getOptionColorConfig(item)
        console.log(item)
        return (
            <Option 
                value={item} 
                onPress={() => { 
                    evaluateSelected(item)
                }}
                backgroundColor={{backgroundColor}}
                color={{color}}
            />
        )
    }

    return (
        <View style={styles.container}>
            <HorizontalScroll>
                {QAs.map(({question, options}, index) => {
                    return (
                        <Round 
                            key={index} 
                            question={question} 
                            options={options}
                            renderOptions={renderOptions}
                            data={selectedOptions}
                        />
                    )
                })}
            </HorizontalScroll>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    full: {
        width: width
    },  
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    item_selected: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      backgroundColor: "white",
    },
    title: {
      fontSize: 32,
    },
  });