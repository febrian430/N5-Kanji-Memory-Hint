import React from "react"
import { useState } from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native";
import { Full } from "../horizontal_scroll";

const width = Dimensions.get('window').width;

const Question = ({value}) => {
    return <Text style={[styles.title]}>{value}</Text>
}

const Option = ({value, onPress, disabled, style }) => {
    const { backgroundColor, color, borderWidth } = style

    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.item, {backgroundColor}, {borderWidth}]}>
            <Text style={[{color}]}>
                {value}
            </Text>
        </TouchableOpacity>
    )
}

const Round = ({question, options, answer, onCorrect, onSelect}) => {

    const [selected, setSelected] = useState(null)  

    const evalSelected = (option) => {
        if(option === answer) {
            onCorrect()
        }
        onSelect(selected)
        setSelected(option)
    }

    const renderOptions = ({item}) => {
        let buttonStyle = styles.default

        if(selected === item) {
            buttonStyle = styles.wrong
        }

        if(selected !== null && item === answer) {
            buttonStyle = styles.correct
        }
        return (
            <Option 
                value={item}
                onPress={() => evalSelected(item)}
                disabled={selected !== null}
                style={buttonStyle}
            />
        )
    }

    return (
        <Full>
            <View>
                <Question value={question} />
            </View>

            <FlatList
                data={options}
                renderItem={renderOptions}
                keyExtractor={(item) => item}
                extraData={selected}
            />
        </Full> 
    )
}

const styles = StyleSheet.create({
    correct: {
        backgroundColor: "green",
        color: "white",
        borderWidth: 0
    },
    wrong: {
        backgroundColor: "red",
        color: "white",
        borderWidth: 0
    },
    default: {
        backgroundColor: "white",
        color: "black",
        borderWidth: 5,
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    }, 
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    }
})

export default Round