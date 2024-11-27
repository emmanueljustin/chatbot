import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props {
  children: React.ReactNode;
  color?: string;
  onPress?: () => void;
}

const CButton: React.FC<Props> = (props) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.65}
        style={[styles.navButton, { backgroundColor: props.color ? props.color : '#89D9F2' }]}
        onPress={props.onPress}
      >
        <Text style={styles.buttonText}>{props.children}</Text>
      </TouchableOpacity>
    </>
  )
}

export default CButton

const styles = StyleSheet.create({
  navButton: {
    elevation: 10,
    width: '100%',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 700,
    color: '#fff',
    lineHeight: 28,
  }
})