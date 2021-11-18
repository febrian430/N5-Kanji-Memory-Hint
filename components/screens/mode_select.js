import React from 'react'
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import { SCREEN, MODE } from '../const'
import { Full } from '../horizontal_scroll'
import MenuButton from '../cmps/menu_button';

const ModeSelect = ({navigation, route}) => {
    const game = route.params.game
    const multi = true

    return (
        <Full style={[styles]}>
            <MenuButton 
                title="Image Meaning"
                onPress= {() => navigation.navigate(SCREEN.CHAPTER_SELECT, {
                    multi: multi,
                    renderNext: game,
                    buttonTitle: `Start ${game}`,
                    mode:  MODE.IMAGE_MEANING
                })}
            />
            <MenuButton 
                title="Reading"
                onPress= {() => navigation.navigate(SCREEN.CHAPTER_SELECT, {
                    multi: multi,
                    renderNext: game,
                    buttonTitle: `Start ${game}`,
                    mode:  MODE.READING
                })}
            />
        </Full>
    )
}

export default ModeSelect

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    }
  });