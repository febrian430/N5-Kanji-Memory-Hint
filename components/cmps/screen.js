import React from 'react'
import { StatusBar, View } from "react-native";


export default NavigationContainer = ({children, style}) => {
    return(
      <View style={[{ flex: 1, marginTop: StatusBar.currentHeight }, style]} >
        {children}
      </View>
    )
}

  