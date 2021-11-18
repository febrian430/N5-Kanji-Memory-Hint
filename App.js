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
import ChapterSelect from './components/screens/chapter_select'
import ModeSelect from './components/screens/mode_select'


import Test from './components/test'
import Jumble from './components/game/jumble'
import Picky from './components/game/picky';
import MenuButton from './components/cmps/menu_button'
import Screen from './components/cmps/screen'

import { SCREEN } from './components/const'


const Stack = createNativeStackNavigator()

const Practice = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <MenuButton 
        title="Multiple Choice"
        onPress= {() => navigation.navigate(SCREEN.CHAPTER_SELECT, 
        {
          multi: true,
          triggerOnSelect: true,
          renderNext: SCREEN.MUL_CHOICE,
          buttonTitle: "Start multiple choice"
        })}
      />
      <MenuButton 
        title="Mix and Match"
        onPress= {() => navigation.navigate(SCREEN.MODE_SELECT, 
        {
          game: SCREEN.MIX_MATCH
        })}
      />
      <MenuButton 
        title="Jumble"
        onPress= {() => navigation.navigate(SCREEN.MODE_SELECT,
        {
          game: SCREEN.JUMBLE
        })}
      />
      <MenuButton 
        title="Pick and Drop"
        onPress= {() => navigation.navigate(SCREEN.PICK_DROP)}
      />
    </View>
  )
}

const Quiz = ({ navigation }) => {
  return (
    <Screen>
      <Text>Quiz Game</Text>
    </Screen>
  )
}

const Home = ({ navigation }) => {
  return (
    <Screen style={styles.container}>
      <StatusBar style="auto" />

      <MenuButton 
        title="List"
        onPress= {() => navigation.navigate(SCREEN.LIST)}
      />

      <MenuButton 
        title="Practice"
        onPress= {() => navigation.navigate(SCREEN.PRACTICE)}
      />

      <MenuButton 
        title="Quiz"
        onPress= {() => navigation.navigate(SCREEN.QUIZ)}
      />

     </Screen>
  )
}

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREEN.HOME} screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name={SCREEN.HOME} component={Home} />
        <Stack.Screen name={SCREEN.LIST} component={Material} />
        <Stack.Screen name={SCREEN.STUDY} component={Study} />
        <Stack.Screen name={SCREEN.CHAPTER_SELECT} component={ChapterSelect} />
        <Stack.Screen name={SCREEN.MUL_CHOICE} component={MultipleChoice} />
        <Stack.Screen name={SCREEN.MIX_MATCH} component={MemoryHint} />
        <Stack.Screen name={SCREEN.JUMBLE} component={Jumble} />
        <Stack.Screen name={SCREEN.PICK_DROP} component={Picky} />
        <Stack.Screen name={SCREEN.MODE_SELECT} component={ModeSelect} />

        
        <Stack.Screen name={SCREEN.PRACTICE} component={Practice} />
        <Stack.Screen name={SCREEN.QUIZ} component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }
});
