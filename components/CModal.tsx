import { StyleSheet, Modal, View } from 'react-native'
import React, { Children } from 'react'

interface Props {
  showModal: boolean;
  children: React.ReactNode;
}

const CModal: React.FC<Props> = (props) => {
  return (
    <>
      <Modal
        visible={props.showModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalBackDrop}>
          <View style={styles.modalContent}>
            {props.children}
          </View>
        </View>
      </Modal>
    </>
  )
}

export default CModal

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
})