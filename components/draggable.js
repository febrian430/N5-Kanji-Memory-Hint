import React, { useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";

// https://stackoverflow.com/questions/56738500/react-native-onlayout-with-react-hooks
//TODO: 
// cleaner way to get abs pos of every options
// add selected state
// set selected when animated object is selected (get by index? maybe selected index?)
// maybe make options as normal view and spawn an animated view on press
// when component dropped to area, judge by selected state

const DraggableView = () => {
    const initialPos = useRef([true, true])
  const pan = useRef(new Animated.ValueXY()).current;
  const pan2 = useRef(new Animated.ValueXY()).current;

  const [originalPosition, setOriginalPosition] = useState([{x:0,y:0}, {}])
  
  const setPos = (event, index) => {
      if(initialPos[index].current) {
        const layout = event.nativeEvent.layout
        setOriginalPosition({x: layout.x, y: layout.y})
        initialPos[index].current = false
      }
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) =>true,

    onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        // console.log("ON TOUCH", gestureState)
        pan.setOffset({x: 0, y: 0})
      },

    onPanResponderMove: (evt, gestureState) =>  
    {
        console.log("ON MOVE", gestureState)
        Animated.event([{
            x: pan.x, // x,y are Animated.Value
            y: pan.y,
        }], {useNativeDriver: false})
        ({
            x: gestureState.moveX, 
            y: gestureState.moveY
        })
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
    onPanResponderRelease: (evt, gestureState) => {
        console.log(`SPRINGING TO ${originalPosition.x},${originalPosition.y}`)
        Animated.spring(
            pan, // Auto-multiplexed
            { toValue: { 
                x: originalPosition.x, 
                y: originalPosition.y
            }, useNativeDriver: false } // Back to zero
          ).start();
    },
  });

  const panResponder2 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) =>true,

    onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        // console.log("ON TOUCH", gestureState)
        pan2.setOffset({x: -40, y: -40})
      },

    onPanResponderMove: (evt, gestureState) =>  
    {
        console.log("ON MOVE", gestureState)
        Animated.event([{
            x: pan2.x, // x,y are Animated.Value
            y: pan2.y,
        }], {useNativeDriver: false})
        ({
            x: gestureState.moveX, 
            y: gestureState.moveY
        })
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
    onPanResponderRelease: (evt, gestureState) => {
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
    <View style={styles.container}>
      <Animated.View
        onLayout={setPos}
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.box]}
      />
      <Animated.View
        onLayout={setPos}
        {...panResponder2.panHandlers}
        style={[pan2.getLayout(), styles.box]}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  box: {
    backgroundColor: "#61dafb",
    width: 80,
    height: 80,
    borderRadius: 4,
  },
});

export default DraggableView;