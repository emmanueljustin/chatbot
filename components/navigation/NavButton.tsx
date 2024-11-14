import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Href, Link } from 'expo-router'

interface Props {
  navTo: Href<string | object>;
  color?: string;
  children: React.ReactNode;
}

const NavButton: React.FC<Props> = (props) => {

  const [pressed, setPressed] = useState(false);

  return (
    <Link
      href={props.navTo}
      style={[
        styles.navButton,
        {
          backgroundColor: props.color ? props.color : '#3B71CA',
          opacity: pressed ? 0.65 : 100
        }
      ]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      {props.children}
    </Link>
  )
}

export default NavButton

const styles = StyleSheet.create({
  navButton: {
    elevation: 10,
    width: '100%',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 28,
    textAlign: 'center',
    color: '#fff',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 8,
  },
})