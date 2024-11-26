import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import { askGemini, writeMessage } from '../../redux/chatSlice';
import { useEffect, useRef, useState } from 'react';
import { EventStatus } from '@/enums/status';
import { CodeSnippet } from '@/components/CodeSnippet';
import useCodeExtractor from '@/hooks/useCodeExtractor';
import SaveModal from './save-modal';

const ChatScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { message, convHistory, status } = useSelector((state: RootState) => state.chat);

  const extractedCode = useCodeExtractor({ convHistory: convHistory });

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [convHistory]);

  return (
    <SafeAreaView style={styles.body}>

      <SaveModal />

      <View style={styles.contentView}>
        <ScrollView ref={scrollViewRef} style={styles.msgBox} contentContainerStyle={styles.msgBoxContent}>
          {convHistory.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                {
                  backgroundColor: msg.role === 'user' ? '#38BDf8' : 'rgba(128, 128, 128, 0.5)',
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }
              ]}
            >
              <Text style={styles.messageText}>{msg.parts[0].text}</Text>
            </View>
          ))}
          <View style={{ height: 'auto', width: '100%', marginTop: 10 }}>
            {extractedCode.map((code, index) => (
              <View key={index} style={{ width: '90%', marginBottom: 10, alignSelf: 'flex-start'}}>
                <CodeSnippet code={code} />
              </View>
            ))}
          </View>
          {status === EventStatus.loading && (
            <View style={[styles.messageBubble, { alignSelf: 'flex-start' }]}>
              <Text style={styles.messageText}>Bot is responding....</Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.userInputContainer}>
          <TextInput 
            style={styles.input}
            multiline={true}
            placeholder='Type your question here'
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            value={message}
            onChangeText={(e) => dispatch(writeMessage({message: e}))}
          />
          <TouchableOpacity
            activeOpacity={message === '' && status === EventStatus.loading ? 1 : 0.5}
            style={[
              styles.sendBtn,
              { 
                backgroundColor: status !== EventStatus.loading ? 'rgba(30, 64, 175, 0.8)' : '#6b7280',
              }
            ]}
            onPress={() => {
              if (message !== '' && status !== EventStatus.loading) {
                dispatch(askGemini({message: message}));
              } else {
                console.log('no message is written');
              }
            }}
          >
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
    backgroundColor: '#141414',
    height: '100%',
  },
  contentView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  msgBox: {
    flex: 1,
    padding: 10,
  },
  msgBoxContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  userInputContainer: {
    padding: 10,
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  messageBubble: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '75%',
  },
  messageText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
  input: {
    width: '80%',
    padding: 15,
    backgroundColor: 'rgba(249, 250, 251, 0.2)',
    borderRadius: 10,
    color: '#fff',
  },
  sendBtn: {
    width: '17%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
  },
})