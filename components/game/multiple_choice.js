import React, { useEffect, useState } from "react"
import { StatusBar, StyleSheet, View } from "react-native"
import Kanji from "../../assets/data/kanji.json"
import shuffle from "../../helpers/shuffler"
import { HorizontalScroll, Full } from "../horizontal_scroll"
import Round from "./round"



const MultipleChoiceGame = ({ navigation, route }) => {


    const [QAs, setQAs] = useState([])
    const [score, setScore] = useState(0)
    const [selectedOptions, setSelectedOptions] = useState([])
    const [questionAnswered, setQuestionAnswered] = useState(0)


    useEffect(() => {
        const selectedChapters = route.params.chapters
        const source = Kanji.kanji_collection.filter((kanji) => selectedChapters.includes(kanji.chapter))
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
    }, [])

    const onCorrect = () => {
        setScore(score+1)
    }

    const onSelect = () => {
        if(questionAnswered >= QAs.length-1)
        {
            //maybe make modal to go back here also
            alert(`You got ${score} questions right`)
        }
        setQuestionAnswered(questionAnswered+1)
    }

    return (
        <View style={styles.container}>
            <HorizontalScroll>
                {QAs.map(({question, options}, index) => {
                    return (
                        <Round 
                            key={index} 
                            question={question.name} 
                            options={options}
                            answer={question.meaning}
                            onCorrect={onCorrect}
                            onSelect={onSelect}
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
    }
  });

  export default MultipleChoiceGame