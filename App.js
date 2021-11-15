import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MemoryHint from './components/game/memory_hint'
import MultipleChoice from './components/game/multiple_choice'
import Material from './components/learn/material'
import Study from './components/learn/study'
import ChapterSelect from './components/chapter_select'

import Test from './components/test'
import Jumble from './components/game/jumble'
import Picky from './components/game/picky';




const Stack = createNativeStackNavigator()

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Hi</Text>

      <Button 
        title="Material"
        onPress= {() => navigation.navigate('Material')}
      />

      <Button 
        title="Multiple Choice"
        onPress= {() => navigation.navigate('Chapter Select', 
        {
          multi: true,
          triggerOnSelect: true,
          renderNext: "Multiple Choice",
          buttonTitle: "Start multiple choice"
        })}
      />

      <Button 
        title="Mix and Match"
        onPress= {() => navigation.navigate('Chapter Select', 
        {
          multi: true,
          renderNext: "Mix-Match",
          buttonTitle: "Start Mix and Match"
        })}
      />

      <Button 
        title="Jumble"
        onPress= {() => navigation.navigate('Jumble')}
      />

      <Button 
        title="Pick"
        onPress= {() => navigation.navigate('Pick')}
      />
       {/* <MemoryHint />
       <MultipleChoice />

       <Material />
       <Test /> */}
     </View>
  )
}

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Material" component={Material} />
        <Stack.Screen name="Study" component={Study} />
        <Stack.Screen name="Chapter Select" component={ChapterSelect} />
        <Stack.Screen name="Multiple Choice" component={MultipleChoice} />
        <Stack.Screen name="Mix-Match" component={MemoryHint} />
        <Stack.Screen name="Jumble" component={Jumble} />
        <Stack.Screen name="Pick" component={Picky} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
