import React, { useEffect, useState } from "react"
import { StatusBar, StyleSheet, View } from "react-native"
import shuffle from "../../helper/shuffler"
import { HorizontalScroll, Full } from "../horizontal_scroll"
import Screen from '../cmps/screen'
import Round from "./round"
import { optionsForKanji, optionsForQuiz, questionsForQuiz } from "../../helper/repo"



const MultipleChoiceGame = ({ navigation, route }) => {


    const [QAs, setQAs] = useState([])
    const [score, setScore] = useState(0)
    const [selectedOptions, setSelectedOptions] = useState([])
    const [questionAnswered, setQuestionAnswered] = useState(0)


    useEffect(() => {
        const selectedChapters = route.params.chapters
        // const source = Kanji.kanji_collection.filter((kanji) => selectedChapters.includes(kanji.chapter))
        // const questionSource = shuffle(source)
        // const optionSource = source.map((option) => {
        //     return option.meaning
        // })
        const questionSource = questionsForQuiz(selectedChapters)

        const questions = questionSource.slice(0, 10)
        const qnas = questions.map((question) => {
            const options = optionsForQuiz(question, "meaning")
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
        <Screen>
            <HorizontalScroll>
                {QAs.map(({question, options}, index) => {
                    return (
                        <Round 
                            key={index} 
                            question={question.rune} 
                            options={options}
                            answer={question.meaning}
                            onCorrect={onCorrect}
                            onSelect={onSelect}
                        />
                    )
                })}
            </HorizontalScroll>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    }
  });

  export default MultipleChoiceGame