import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Kanji from '../assets/data/kanji.json'

const Chapter = ({onPress, title, isSelected}) => {
    const selectedStyle = isSelected ? styles.button_selected : null
    console.log(selectedStyle)
    return (
        <TouchableOpacity style={[selectedStyle]} onPress={onPress} >
            <Text style={[styles.title]}>{title}</Text>
        </TouchableOpacity>
    )
}

const ChapterSelect = ({ navigation, route }) => {
    const [multi, setMulti] = useState(false)
    const [triggerOnSelect, setTriggerOnSelect] = useState(false)
    const [selected, setSelected] = useState([])
    const [renderNext, setRenderNext] = useState(null)
    const [buttonTitle, setButtonTitle] = useState("Next Act")

    const [chapterNumbers, setChapterNumbers] = useState([])

    useEffect(() => {
        const kanjis = Kanji.kanji_collection
        const cNumbers = kanjis.map(kanji => kanji.chapter)
            .filter((chapter, index, self) => self.indexOf(chapter) === index)
        setChapterNumbers([...cNumbers])

        const params = route.params
        setRenderNext(params.renderNext)

        if(params.buttonTitle) {
            setButtonTitle(params.buttonTitle)
        }

        if(params.multi) {
            setMulti(true)
        } else if(params.triggerOnSelect){
            setTriggerOnSelect(true)
        }
    }, [])  

    useEffect(() => {
        if(triggerOnSelect) {
            nextScreen()
        }
    }, [selected])

    const onChapterSelect = (item) => {
        if(selected.includes(item)) {
            setSelected(selected.filter((chapter) => chapter !== item))
        } else if(multi) {
            setSelected([...selected, item])
        } else {
            setSelected([item]) 
        }
    }

    const nextScreen = () => {
        navigation.navigate(renderNext, {
            chapters: selected
        })
    }

    const renderChapters = ({item}) => {
        return (
            <Chapter  
                onPress={() => onChapterSelect(item)}
                title={`Chapter ${item}`}
                isSelected={selected.includes(item)}
            />
        )
    }

    return (
        <View>
            <FlatList 
                data={chapterNumbers}
                renderItem={renderChapters}
                keyExtractor={(item) => `${item}`}
                extraData={selected}
            />

            <Button 
                title={buttonTitle} 
                onPress={nextScreen}  />
        </View>
    )
}

const styles = StyleSheet.create({
    button_selected: {
        backgroundColor: "blue",
        color: "white"
    },

    title: {
        fontSize: 32
    }
})

export default ChapterSelect