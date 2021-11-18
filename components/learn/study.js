import React from "react";
import { Button, Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import { HorizontalScroll, Full } from "../horizontal_scroll"
import Screen from '../cmps/screen'
import { SCREEN } from "../const"



const Study = ({ navigation, route }) => {
    const kanjis = route.params.kanjis
    const current = route.params.current
    const kanji = kanjis[current]

    
    const next = () => {
        if(current < kanjis.length-1) {
            return (
                <Button title="next" onPress={() => navigation.replace(SCREEN.STUDY, 
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
                    <Text style={{fontSize: 30}}>{kanji.rune}</Text>
                    <Text>({kanji.onyomi})</Text>
                    <Text>({kanji.kunyomi})</Text>
                </Full>
                <Full>
                    <Text>Stroke order</Text>
                </Full>
                <Full>
                    <Text>Examples</Text>
                    {kanji.examples.map((example) => {
                        return (
                            <View>
                                <Text>{example.rune}</Text>
                                <Text>{example.spelling}</Text>
                                <Text>{example.meaning}</Text>
                            </View>
                        )
                    })}
                    {next()}
                </Full>
            </HorizontalScroll>
        </Screen>
    )
}

export default Study