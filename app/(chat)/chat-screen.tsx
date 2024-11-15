import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import { sendMessage, writeMessage } from '../redux/chatSlice';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.chat.message);

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.contentView}>
        <View style={styles.userInputContainer}>
          <TextInput 
            style={styles.input}
            placeholder='Type your question here'
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            value={message}
            onChangeText={(e) => dispatch(writeMessage({message: e}))}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={() => dispatch(sendMessage())}>
            <Icon name='send' size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#424242',
    height: '100%',
  },
  contentView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingHorizontal: 20
  },
  userInputContainer: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 15,
    backgroundColor: 'rgba(249, 250, 251, 0.2)',
    borderRadius: 10,
    color: '#fff',
  },
  sendBtn: {
    width: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(245, 158, 11, 0.8)',
  },
})