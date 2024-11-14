import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CText from '@/components/CText';
import NavButton from '@/components/navigation/NavButton';

const { height: windowHeight } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.contextView}>
        <Text style={styles.headerStyle}>
          Chatter
          <Text style={{ color: '#FFA500' }}>bot!</Text>
        </Text>
        
        <View style={{
          marginTop: 50,
          backgroundColor: '#7dd3fc',
          width: '100%',
          borderRadius: 15,
          padding: 20,
        }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 24,
          }}>
            Get Started
          </Text>
          <View style={{ 
            marginTop: 10,
            width: '75%',

          }}>
            <Text style={{
              fontWeight: '500',
              fontSize: 17,
            }}>
              Harness the full power of AI through this app
            </Text>
          </View>
        </View>

        <View style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View style={styles.contentBox}></View>
          <View style={styles.contentBox}></View>
        </View>

        <View style={{ marginTop: 'auto' }}>
          <NavButton
            navTo={'/'}
            color='#38BDF8'
          >
            Chat with Bot
          </NavButton>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#1F2937',
    height: '100%',
  },
  contextView: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    height: '100%',
  },
  mainContainer: {
    width: '100%',
    backgroundColor: '#9ca3af',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerStyle: {
    textAlign: 'center',
    fontFamily: 'RubikMonoOne-Regular',
    fontSize: 27,
    lineHeight: 33,
    color: '#fff',
  },
  contentBox: {
    backgroundColor: '#374151',
    borderWidth: 0.5,
    borderColor: '#4B5563',
    borderRadius: 15,
    height: 150,
    width: '47%',
    overflow: 'hidden',
  },
})