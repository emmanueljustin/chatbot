import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { saveChat, setChatTitle, triggerSavePopup } from '../../redux/chatSlice';
import CModal from '@/components/CModal';
import { useRouter } from 'expo-router';

const SaveModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { saveModal, chatTitle } = useSelector((state: RootState) => state.chat);
  return (
    <>
      <CModal showModal={saveModal}>
        <Text style={styles.modalTitle}>
          Save this <Text style={{ color: '#FBBF24' }}>Conversation</Text>
        </Text>
        <TextInput 
          style={styles.input}
          multiline={true}
          placeholder='Enter chat title here'
          placeholderTextColor="rgba(255, 255, 255, 0.3)"
          value={chatTitle}
          onChangeText={(e) => dispatch(setChatTitle(e))}
        />
        
        <TouchableOpacity
          activeOpacity={chatTitle === '' ? 1 : 0.65}
          style={[styles.button, { backgroundColor: chatTitle === '' ? '#B0B0B0' : '#89D9F2' }]}
          onPress={chatTitle === ''
            ? () => {} 
            : () => dispatch(saveChat(chatTitle))}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.65}
          style={[styles.button, { marginTop: 10, backgroundColor: 'rgba(249, 250, 251, 0.2)' }]}
          onPress={() => dispatch(triggerSavePopup(false))}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </CModal>
    </>
  )
}

export default SaveModal

const styles = StyleSheet.create({
  modalBackDrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'rgba(51, 51, 51, 1)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 17,
    color: '#fff',
    fontFamily: 'RubikMonoOne-Regular',
    textAlign: 'center',
  },
  input: {
    marginTop: 40,
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(249, 250, 251, 0.2)',
    borderRadius: 10,
    color: '#fff',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff'
  }
})