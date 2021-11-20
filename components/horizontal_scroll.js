import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Screen from './cmps/screen'

const { width, height } = Dimensions.get('window');



export const HorizontalScroll = ({children}) => {
    return (
        <ScrollView 
            horizontal
            snapToInterval={width}
            disableIntervalMomentum
        >
            {children}
        </ScrollView>
    )
}



export const Full = (props) => {
    const { children } = props
    const style = props.style || []
    
    return (
        <Screen style={[...style, styles.full]}>
            {children}
        </Screen>
    )
}

const styles = StyleSheet.create({
    full: {
        width: width,
        height: height  
    }
})
