import React, { useRef, useState, useEffect } from "react";
import { Animated, PanResponder, StyleSheet, Text, View } from "react-native";
import { JUMBLE } from "../const";

// https://stackoverflow.com/questions/56738500/react-native-onlayout-with-react-hooks
//TODO: 
// cleaner way to get abs pos of every options
// add selected state
// set selected when animated object is selected (get by index? maybe selected index?)
// maybe make options as normal view and spawn an animated view on press
// when component dropped to area, judge by selected state

const Draggable = ({value, onDrop}) => {

  const [val, setVal] = useState(null)
  const [coordinate, setCoordinate] = useState({x: 0, y: 0})
  const [solved, setSolved] = useState(false)

  const pan = useRef(new Animated.ValueXY()).current
  const opacity = useRef(new Animated.Value(1)).current
  
  useEffect(() => {
    setVal(value)
  }, [])


  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        // console.log("ON TOUCH", gestureState)
        console.log(gestureState)
        // pan.setOffset({x: coordinate.x-40, y: coordinate.y-40})
      },


    onPanResponderMove: Animated.event([
      null, { dx: pan.x, dy: pan.y }], {useNativeDriver: false}),

    onPanResponderRelease: (evt, gestureState) => {
      console.log("ON RELEASE", gestureState)

      const value = onDrop(val,
        {
          x: gestureState.moveX, 
          y: gestureState.moveY
        })
      if(!solved) {
        if(value === JUMBLE.CORRECT) {
          alert("correct")
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
          }).start(() => setSolved(true))
        } else {
          if(value === JUMBLE.WRONG) {
            alert("wrong")
          }
          Animated.spring(
            pan, // Auto-multiplexed
            { toValue: { 
                x: 0, 
                y: 0
            }, useNativeDriver: false } // Back to zero
          ).start();
        }
      }
    },

    onPanResponderTerminate: (evt, gestureState) => {
        // Animated.spring(
        //     pan, // Auto-multiplexed
        //     { toValue: { 
        //         x: pan.x, 
        //         y: pan.y 
        //     }, useNativeDriver: false } // Back to zero
        //   ).start();
    },
  });

  return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.box, {
          opacity: opacity
        }]}
      >
        <Text>{value}</Text>
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box: {
    backgroundColor: "#61dafb",
    width: 80,
    height: 80,
    borderRadius: 4,
    borderWidth: 1
  },
});

export default Draggable;