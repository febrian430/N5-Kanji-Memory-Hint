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

import Test from './components/test'
import Jumble from './components/game/jumble'
import Picky from './components/game/picky';
import MenuButton from './components/cmps/menu_button'
import Screen from './components/cmps/screen'


const Stack = createNativeStackNavigator()

const Practice = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <MenuButton 
        title="Multiple Choice"
        onPress= {() => navigation.navigate('Chapter Select', 
        {
          multi: true,
          triggerOnSelect: true,
          renderNext: "Multiple Choice",
          buttonTitle: "Start multiple choice"
        })}
      />
      <MenuButton 
        title="Mix and Match"
        onPress= {() => navigation.navigate('Chapter Select', 
        {
          multi: true,
          renderNext: "Mix-Match",
          buttonTitle: "Start Mix and Match"
        })}
      />
      <MenuButton 
        title="Jumble"
        onPress= {() => navigation.navigate('Jumble')}
      />
      <MenuButton 
        title="Pick and Drop"
        onPress= {() => navigation.navigate('Pick')}
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
        onPress= {() => navigation.navigate('Material')}
      />

      <MenuButton 
        title="Practice"
        onPress= {() => navigation.navigate('Practice')}
      />

      <MenuButton 
        title="Quiz"
        onPress= {() => navigation.navigate('Quiz')}
      />

     </Screen>
  )
}

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Material" component={Material} />
        <Stack.Screen name="Study" component={Study} />
        <Stack.Screen name="Chapter Select" component={ChapterSelect} />
        <Stack.Screen name="Multiple Choice" component={MultipleChoice} />
        <Stack.Screen name="Mix-Match" component={MemoryHint} />
        <Stack.Screen name="Jumble" component={Jumble} />
        <Stack.Screen name="Pick" component={Picky} />
        
        <Stack.Screen name="Practice" component={Practice} />
        <Stack.Screen name="Quiz" component={Quiz} />
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
