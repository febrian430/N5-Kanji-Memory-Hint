import React, { useEffect, useState, useRef } from "react";
import { Alert, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import shuffle from "../../helper/shuffler";
import Screen from '../cmps/screen'
import { Distinct as kanji } from "../../helper/repo"
import { Full } from "../horizontal_scroll";
import { MODE, FIELD } from "../const";
import { MixMatch } from "../../helper/repo";

const Option = ({value, onPress, disabled, selected}) => {

  let style = styles.option_default
  if(disabled) {
    style = styles.option_solved
  } else if(selected) {
    style = styles.option_selected
  }

  const { backgroundColor, borderColor, color } = style
  const wrapperStyle = { backgroundColor, borderColor }

  //add image style for image meaning round
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, wrapperStyle]} disabled={disabled}>
      <Text style={[styles.title, {color}, styles.runeText]}>{value}</Text>
    </TouchableOpacity>
  )
}

const MemoryHint = ({ route }) => {

    const [options, setOptions] = useState([0])
    const [solved, setSolved] = useState([])
    const [selected, setSelected] = useState([])
    const [wrongCount, setWrongCount] = useState(0)
    const [mode, setMode] = useState(MODE.IMAGE_MEANING)
    const isStarted = useRef(false)

    useEffect(() => {
      function getKeys(mode) {
        if(mode === MODE.IMAGE_MEANING) {
          return [FIELD.IMAGE, FIELD.RUNE]
        } else {
          return [FIELD.RUNE, FIELD.SPELLING]
        }
      }   

      const selectedChapters = route.params.chapters
      
      const gameMode = route.params.mode
      setMode(gameMode)
      const [questionKey, answerKey] = getKeys(gameMode)

      console.log("GAME MODE:", gameMode)

      // var source = shuffle(kanji.filter((kanji) => selectedChapters.includes(kanji.chapter))).slice(0,5)
      // questions = source.map((element) =>  { return { value: element[key1], key: element[key2] }})
      // answers = source.map((element) => { return { value: element[key2], key: element[key1] }} )

      // mixed = [...questions, ...answers]
      // mixed = shuffle(mixed)
      const questions = MixMatch.getQuestion(questionKey, answerKey, 6, selectedChapters)

      setOptions(questions)
      console.log(questions)
    }, [])

    const select = (option) => {
      if(selected.length == 0) {
        setSelected([...selected, option])
      } else {
        if(selected[0].value === option.key) {
          setSolved([...solved, option, selected[0]])
        } else {
          setWrongCount(wrongCount+1)
        }
        setSelected([])
      }
      console.log(selected)
    }

    const deselect = () => {
      setSelected([])
    }

    const onOptionPress = (option) => {
      if(selected[0]?.value === option.value) {
        deselect()
      } else {
        select(option)
      }
    }

    useEffect(() => {

    }, [selected])

    useEffect(() => {
      if(isStarted && solved.length === options.length) {
        alert(`Finished. Wrong attempts: ${wrongCount}`)
      }
    }, [solved])

    const renderItem = ({ item }) => {
      return (
        <Option
          key={item.value}
          value={item.value}
          onPress={() => onOptionPress(item)}
          disabled={solved.includes(item)}
          selected={selected.includes(item)}
        />
      );
    };

    return (
      <Full style={[styles.container]}>
          <View style={[styles.wrapper]}>{/* <FlatList
            contentContainerStyle={{alignSelf: 'flex-start'}}
            numColumns={Math.ceil(options.length / 2)}     
            data={options}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}`}
            extraData={selected}
            numColumns={4}
          /> */}

          {
            options.map((item, index) => {
              return renderItem({ item })
            })
          }
        </View>
      </Full>
    );
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    
  },
  wrapper: {
    backgroundColor: "aqua",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    margin: 20,
  },
  card: {
    margin: 10,
    borderWidth: 2,
    padding: 20,
    height: 150,
    width: 70,
    justifyContent: "center",
    alignContent: "center"
  },

  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 2,
    color: "white",
    backgroundColor: "green",
  },

  option_default: {
    backgroundColor: "white",
    color: "black",
    borderColor: "black"
  },

  option_selected: {
    backgroundColor: "green", 
    color: "white",
    borderColor: "green" 
  },

  option_solved: {
    backgroundColor: "grey", 
    color: "white",
    borderColor: "grey" 
  },

  title: {
    fontSize: 18,
    // borderWidth: 2
  },

  //add image style
  runeText: {
    width: 15
  }
});

export default MemoryHint;