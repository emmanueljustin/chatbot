import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import IconAnt from 'react-native-vector-icons/AntDesign';
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import History from '../../interfaces/history';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setConvHistory } from '../../redux/chatSlice';
import useLocalization from '@/hooks/useLocalization';

const HistorySection = () => {

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const [chatHistory, setChatHistory] = useState<History[]>([])

  const { t } = useLocalization();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'chat-history'),
      (querySnapshot) => {
        const messageHistory: History[] = [];
        querySnapshot.forEach((doc) => {
          const chat = doc.data();
          messageHistory.push({
            from: 'history',
            uid: doc.id,
            chatTitle: chat.chatTitle,
            history: chat.history,
          });
        });
        setChatHistory(messageHistory);
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Text style={styles.header}>
        {t('home.history')}
      </Text>

      <ScrollView style={{
        marginBottom: 10,
      }}>
        {chatHistory.map((chats, index) => (
          <TouchableOpacity
            activeOpacity={0.65}
            key={index}
            style={styles.historyTile}
            onPress={() => {
              dispatch(setConvHistory(chats.history));
              router.push({pathname: '/chat', params: { chats: JSON.stringify(chats) }});
            }}
          >
            <Text 
              style={styles.tileText}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {chats.chatTitle}
            </Text>
            <IconAnt name='caretright' size={15} color={'#fff'} />
          </TouchableOpacity>
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
    backgroundColor: 'rgba(51, 51, 51, 1)',
    // borderColor: '#89D9F2',
    borderWidth: 0.8
  },
  tileText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
    // fontFamily: 'monospace'
  }
})