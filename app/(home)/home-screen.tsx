import { StyleSheet, Text, View, Dimensions, Image, Button } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavButton from '@/components/navigation/NavButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { increment } from '../redux/counterSlice';

const { height: windowHeight } = Dimensions.get('window');

const HomeScreen = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter.value);

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.contentView}>
        <Text style={styles.headerStyle}>
          Chatter
          <Text style={{ color: '#FFA500' }}>bot!</Text>
        </Text>
        
        <View style={styles.getStartedBox}>
          <Image
            source={require("../../assets/images/robot-ai.png")}
            style={styles.getStartedRobot}
          />
          <Text style={{
            fontWeight: 'bold',
            fontSize: 24,
          }}>
            Get Started
          </Text>
          <View style={{ 
            marginTop: 10,
            width: '65%',
          }}>
            <Text style={{
              fontWeight: '500',
              fontSize: 17,
            }}>
              Harness the full future of AI through this app with react natives new cutting edge tech
            </Text>
          </View>
        </View>

        <View style={styles.mainContentBox}>
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
  contentView: {
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
  getStartedBox: {
    position: 'relative',
    marginTop: 50,
    backgroundColor: '#7dd3fc',
    width: '100%',
    borderRadius: 15,
    padding: 20,
    overflow: 'hidden',
  },
  getStartedRobot: {
    position: 'absolute',
    right: -90,
    bottom: -90,
    height: 250,
    width: 250,
  },
  mainContentBox: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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