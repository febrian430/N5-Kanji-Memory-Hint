import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Kanji from "../../assets/data/kanji.json"
import { Full, HorizontalScroll } from "../horizontal_scroll";

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
        const kanjis = Kanji.kanji_collection
        const chapterNumbers = kanjis.map(kanji => kanji.chapter)
            .filter((chapter, index, self) => self.indexOf(chapter) === index)
        setChapters([...chapterNumbers])
    }, [])

    useEffect(() => {
        const chapter = Kanji.kanji_collection.filter(kanji => kanji.chapter == selChapter)
        setViewingChapter(chapter)
    }, [selChapter])  

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => navigation.push("Study", 
                { 
                    kanjis: viewingChapter,
                    current: index
                })}>
                <Text>{item.name} ({item.pronounciation})</Text>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView>
            <View>
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
            <View>
                <FlatList
                    data={viewingChapter}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                    extraData={selChapter}
                >
                </FlatList>
            </View>
        </ScrollView>
    )
}

export default Material