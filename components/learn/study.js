import React from "react";
import { Button, Dimensions, StyleSheet, Text } from "react-native";
import { HorizontalScroll, Full } from "../horizontal_scroll"


export default Study = ({ navigation, route }) => {
    const kanjis = route.params.kanjis
    const current = route.params.current
    console.log("KANJI", kanjis, "CURRENT", current)
    const kanji = kanjis[current]

    console.log(kanji)
    
    const next = () => {
        if(current < kanjis.length-1) {
            return (
                <Button title="next" onPress={() => navigation.replace("Study", 
                    { 
                        kanjis: kanjis,
                        current: current+1
                    })} 
                />
            )
        }
        else {
            return (
                <Text>End of chapter</Text>
            )
        }
    }

    

    return (
        <HorizontalScroll>
            <Full>
                <Text>{kanji.name}</Text>
                <Text>({kanji.pronounciation})</Text>
                <Text>{kanji.meaning}</Text>
            </Full>
            <Full>
                <Text>Stroke order</Text>
            </Full>
            <Full>
                <Text>Slide 3</Text>
                {next()}
            </Full>
        </HorizontalScroll>
    )
}

