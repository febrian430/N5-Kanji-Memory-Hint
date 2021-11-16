import React from "react";
import { Button, Dimensions, StatusBar, StyleSheet, Text } from "react-native";
import { HorizontalScroll, Full } from "../horizontal_scroll"
import Screen from '../cmps/screen'


const Study = ({ navigation, route }) => {
    const kanjis = route.params.kanjis
    const current = route.params.current
    const kanji = kanjis[current]

    
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
        <Screen>
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
        </Screen>
    )
}

export default Study