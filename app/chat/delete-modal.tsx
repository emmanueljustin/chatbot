import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CModal from '@/components/CModal'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import useFirebaseDeleteDoc from '@/hooks/useFirebaseDeleteDoc'
import History from '../../interfaces/history';
import { triggerDeletePopup } from '@/redux/chatSlice'
import useLocalization from '@/hooks/useLocalization'

const DeleteModal = () => {

  const router = useRouter();

  const { chats } = useGlobalSearchParams<{ chats: string }>();
  const parsedChats: History | undefined = chats ? JSON.parse(chats) : undefined;

  const dispatch = useDispatch<AppDispatch>();
  const { deleteModal } = useSelector((state: RootState) => state.chat);

  const { deleteDocument } = useFirebaseDeleteDoc({
    collectionName: 'chat-history',
    docId: parsedChats?.uid!,
  });

  const { t, currentLanguage } = useLocalization();
  
  return (
    <>
      <CModal showModal={deleteModal}>

        { currentLanguage === "en" && (
          <Text style={styles.modalTitle}>
            Delete <Text style={{ color: '#89D9F2' }}>chat</Text>
          </Text>
        )}

        { currentLanguage === "ja" && (
          <Text style={[
            styles.modalTitle,
            {
              fontFamily: 'ZenAntiqueSoft-Regular',
              fontWeight: '900',
              fontSize: 26
            }
          ]}>
            <Text style={{ color: '#89D9F2' }}>チャット</Text>を削除する
          </Text>
        )}
        
        <Text style={styles.modalSubtitle}>
          {t('chats.deleteMessage')}
        </Text>

        <View style={styles.btnGroup}>
          <TouchableOpacity
            activeOpacity={0.65}
            style={[styles.button, { backgroundColor: '#89D9F2' }]}
            onPress={() => {
              triggerDeletePopup(false);
              deleteDocument();
              router.dismiss();
            }}
          >
            <Text style={styles.buttonText}>{t('chats.delete')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.65}
            style={[styles.button, { backgroundColor: 'rgba(249, 250, 251, 0.2)' }]}
            onPress={() => dispatch(triggerDeletePopup(false))}
          >
            <Text style={styles.buttonText}>{t('chats.cancel')}</Text>
          </TouchableOpacity>
        </View>
      </CModal>
    </>
  )
}

export default DeleteModal

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 17,
    color: '#fff',
    fontFamily: 'RubikMonoOne-Regular',
    textAlign: 'center',
  },
  modalSubtitle: {
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
  },
  btnGroup: {
    marginTop: 25,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '48%',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff'
  }
})