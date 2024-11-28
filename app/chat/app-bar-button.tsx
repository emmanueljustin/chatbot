import { Pressable, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  fromHistory: boolean;
  onPress?: () => void;
}

const AppBarButton: React.FC<Props> = (props) => {

  const [textColor, setTextColor] = useState('#fff')

  if (props.fromHistory) {
    return <>
      <Pressable
        hitSlop={{ top: 50, left: 50, bottom: 50, right: 50 }}
        onPressIn={() => setTextColor('#89D9F2')}
        onPressOut={() => setTextColor('#fff')}
        onPress={props.onPress}
      >
        <MaterialIcons name='delete-forever' size={30} color={textColor} />
      </Pressable>
    </>
  }

  return (
    <>
      <Pressable
        hitSlop={{ top: 50, left: 50, bottom: 50, right: 50 }}
        onPressIn={() => setTextColor('#89D9F2')}
        onPressOut={() => setTextColor('#fff')}
        onPress={props.onPress}
      >
        <Text style={[styles.text, { color: textColor }]}>Save</Text>
      </Pressable>
    </>
  )
}

export default AppBarButton

const styles = StyleSheet.create({
  text: {
    padding: 10,
    fontSize: 17,
    fontWeight: 'bold',
  }
})