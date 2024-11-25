import { ScrollView, StyleSheet, Text, View } from 'react-native'
import IconAnt from 'react-native-vector-icons/AntDesign';
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/FirebaseConfig';
import MessageHistory from '@/interfaces/message-history';

const HistorySection = () => {

  const [chatHistory, setChatHistory] = useState<History[]>([])

  interface History {
    chatTitle: String;
    history: MessageHistory[]
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'chat-history'),
      (querySnapshot) => {
        const messageHistory: History[] = [];
        querySnapshot.forEach((doc) => {
          const chat = doc.data();
          messageHistory.push({
            chatTitle: chat.data.chatTitle,
            history: chat.data.history,
          });
        });
        setChatHistory(messageHistory);
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );

    return () => unsubscribe();
  }, [])

  return (
    <>
      <Text style={styles.header}>
        History
      </Text>

      <ScrollView style={{
        marginBottom: 10,
      }}>
        {chatHistory.map((chats, index) => (
          <View key={index} style={styles.historyTile}>
            <Text 
              style={styles.tileText}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {chats.chatTitle}
            </Text>
            <IconAnt name='caretright' size={15} color={'#fff'} />
          </View>
        ))}
      </ScrollView>
    </>
  )
}

export default HistorySection

const styles = StyleSheet.create({
  header: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
    color: '#fff'
  },
  historyTile: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row', 
    marginBottom: 10,
    padding: 15,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#232323',
    borderColor: '#89D9F2',
    borderWidth: 0.8
  },
  tileText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17
  }
})