import React, { useEffect, useState, useRef } from "react";
import { Alert, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import shuffle from "../../helper/shuffler";
import kanji from "../../assets/data/kanji.json"
import { Full } from "../horizontal_scroll";

const Option = ({value, onPress, disabled, selected}) => {

  let style = styles.option_default
  if(disabled) {
    style = styles.option_solved
  } else if(selected) {
    style = styles.option_selected
  }

  const { backgroundColor, borderColor, color } = style
  const wrapperStyle = { backgroundColor, borderColor }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, wrapperStyle]} disabled={disabled}>
      <Text style={[styles.title, {color}]}>{value}</Text>
    </TouchableOpacity>
  )
}

const MemoryHint = ({ route }) => {

    const [options, setOptions] = useState([0])
    const [solved, setSolved] = useState([])
    const [selected, setSelected] = useState([])
    const [wrongCount, setWrongCount] = useState(0)

    const isStarted = useRef(false)

    useEffect(() => {
      const selectedChapters = route.params.chapters

      var source = shuffle(kanji.kanji_collection.filter((kanji) => selectedChapters.includes(kanji.chapter))).slice(0,5)
      names = source.map((element) =>  { return { value: element.name, key: element.meaning }})
      meanings = source.map((element) => { return { value: element.meaning, key: element.name }} )

      mixed = [...names, ...meanings]
      mixed = shuffle(mixed).slice()

      setOptions([...mixed])
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
      if(isStarted && solved.length === options.length) {
        alert(`Finished. Wrong attempts: ${wrongCount}`)
      }
    }, [solved])

    const renderItem = ({ item, index }) => {
      return (
        <Option
          key={index}
          value={item.value}
          onPress={() => onOptionPress(item)}
          disabled={solved.includes(item)}
          selected={selected.includes(item)}
        />
      );
    };

    return (
      <Full style={[styles.container]}>
        <FlatList
          data={options}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          extraData={selected}
        />
      </Full>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
    fontSize: 32,
  },
});

export default MemoryHint;