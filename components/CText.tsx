import { StyleSheet, Text, TextProps } from 'react-native'
import React from 'react'

const CText: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[style, { fontFamily: 'Rubik-VariableFont_wght' }]} {...props}>{children}</Text>
  )
}

export default CText

const styles = StyleSheet.create({})