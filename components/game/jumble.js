import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ScrollView, Text, Touchable, View } from 'react-native'
import Screen from '../cmps/screen'
import { questionForJumble, optionsForJumble, Jumble as JumbleRepo } from '../../helper/repo'
import { FIELD, MODE } from '../const'
import { HorizontalScroll } from '../horizontal_scroll'
import JumbleRound from './jumble_round'



//@ts-check
const Jumble = ({navigation, route}) => {

    const isInit = useRef(true)
    const [QNA, setQNA] = useState([])
    const [winCount, setWinCount] = useState(0)
    const [attemptCount, setAttemptCount] = useState(0)

    const mode = route.params.mode
    const selectedChapters = route.params.chapters

    useEffect(() => {
        function getKeys(mode) {
            if(mode === MODE.IMAGE_MEANING) {
              return [FIELD.IMAGE, FIELD.RUNE]
            } else {
              return [FIELD.RUNE, FIELD.SPELLING]
            }
        }
        console.log(selectedChapters)

        const [questionKey, answerKey] = getKeys(mode)
        const qnas = JumbleRepo.getQuestion(questionKey, answerKey, 10, selectedChapters)
        console.log(qnas)
        console.log("huh?")

        setQNA(qnas)
    }, [])

    //add quiz mode
    //change logic to check if game finished or not
    useEffect(() => {
        if (isInit.current) {
            isInit.current = false
        } else if(winCount === QNA.length) {
            alert(`win ${winCount}, attempts ${attemptCount}`)
        }
    }, [winCount])

    

   
    const onFinish = (isCorrect) => {
        if(isCorrect) {
            setWinCount(winCount+1)
        } else {
            setAttemptCount(attemptCount+1)
        }
    }

    const renderRound = ({item, index}) => {
        console.log(item)
        return (
            <JumbleRound 
                question={item.question.value}
                options={item.options}
                answer={item.question.key}
                index={index}
                onFinish={onFinish}
                key={String(index)}
                retryable
            />
        )
    }

    return (
            <HorizontalScroll>
                {
                    QNA.map((item, index) => {
                        return renderRound({item, index})
                    })
                }

                {/* <Text>Hi</Text> */}
            </HorizontalScroll>
    )
}

export default Jumble