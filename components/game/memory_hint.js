import React, { useEffect, useState } from "react";
import { Alert, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import shuffle from "../../helpers/shuffler";
import kanji from "../../assets/data/kanji.json"

const Option = ({value, onPress, backgroundColor, textColor}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{value}</Text>
    </TouchableOpacity>
  )
}

const MemoryHint = () => {

  const [options, setOptions] = useState([])
  const [solved, setSolved] = useState([])
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    var source = kanji.kanji_collection

    //make options datasource
    names = source.map((element) =>  { return { value: element.name, key: element.meaning }})
    meanings = source.map((element) => { return { value: element.meaning, key: element.name }} )
    mixed = [...names, ...meanings]
    mixed = shuffle(mixed)
    console.log(mixed)
    setOptions([...mixed])

  }, [])

  const pushToSelected = (item) => {
    if(selected.length == 0) {
      setSelected([...selected, item])
    } else {
      if(selected[0].value === item.key) {
        alert("righto!")
        setSolved([...solved, item, selected[0]])
      }
      setSelected([])
    }
    console.log(selected)

  }

  const drawOptionColor = (isSelected, isSolved) => {
    if(isSelected) {
      return {backgroundColor: "green", color: "white"}
    }
    if(isSolved) {
      return { backgroundColor: "gray", color: "white"}
    }
    return { backgroundColor: "white", color: "black"}
  }

  const renderItem = ({ item }) => {
    const isSelected = selected.some((option) => option.value === item.value)
    const isSolved = solved.some((option) => option.value === item.value)

    const { backgroundColor, color } = drawOptionColor(isSelected, isSolved)

    return (
      <Option
        value={item.value}
        onPress={() => pushToSelected(item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
        extraData={selected}
      />
    </View>
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
    color: "white",
    backgroundColor: "green",
  },
  item_revealed: {
    backgroundColor: "white",
  },
  title: {
    fontSize: 32,
  },
});

export default MemoryHint;