import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import { sendMessage, writeMessage } from '../redux/chatSlice';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.chat.message);

  const messageHistory = [
    {
      from: 'user',
      message: 'Hello! My name is Emmanuel Justin Atienza'
    },
    {
      from: 'bot',
      message: 'Hello Emmanuel Justin Atienza how can I help you?'
    },
  ];

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.contentView}>
        <ScrollView style={styles.msgBox} contentContainerStyle={styles.msgBoxContent}>
          {messageHistory.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                {
                  backgroundColor: msg.from === 'user' ? '#38BDf8' : '#FFA500',
                  alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                }
              ]}
            >
              <Text style={styles.messageText}>{msg.message}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.userInputContainer}>
          <TextInput 
            style={styles.input}
            placeholder='Type your question here'
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            value={message}
            onChangeText={(e) => dispatch(writeMessage({message: e}))}
          />
          <TouchableOpacity activeOpacity={0.5} style={styles.sendBtn} onPress={() => dispatch(sendMessage())}>
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
    paddingHorizontal: 10,
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
    fontWeight: '500',
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
    backgroundColor: 'rgba(30, 64, 175, 0.8)',
  },
})