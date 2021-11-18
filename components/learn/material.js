import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Kanji from "../../assets/data/kanji.json"
import Screen from "../cmps/screen"
import { SCREEN } from "../const"


const ChapterListOption = ({chapter, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>Chapter {chapter}</Text>
        </TouchableOpacity>
    )
}

const Material = ({ navigation }) => {
    const [chapters, setChapters] = useState([])
    const [viewingChapter, setViewingChapter] = useState([])
    const [selChapter, setSelChapter] = useState(null)

    useEffect(() => {
        const kanjis = Kanji
        const chapterNumbers = kanjis.map(kanji => kanji.chapter)
            .filter((chapter, index, self) => self.indexOf(chapter) === index)
        setChapters([...chapterNumbers])
    }, [])

    useEffect(() => {
        const chapter = Kanji.filter(kanji => kanji.chapter == selChapter)
        setViewingChapter(chapter)
    }, [selChapter])  

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => navigation.push(SCREEN.STUDY, 
                { 
                    kanjis: viewingChapter,
                    current: index
                })}>
                <Text style={{fontSize: 20}}>{item.rune}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Screen>
            <View style={[styles.container]}>
            {chapters.map((chapter, index) => {  
                return (
                    <ChapterListOption 
                        key={index}
                        chapter={chapter} 
                        onPress={() => setSelChapter(chapter)} 
                    />
                    )
            })}
            </View>
            <ScrollView>
                <FlatList
                    data={viewingChapter}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.rune}
                    extraData={selChapter}
                >
                </FlatList>
            </ScrollView>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

export default Material