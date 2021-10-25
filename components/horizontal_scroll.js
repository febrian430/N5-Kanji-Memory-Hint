import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const width = Dimensions.get('window').width;

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
        <View style={[...style, styles.full]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    full: {
        width: width,
        // height: height
    }
})
