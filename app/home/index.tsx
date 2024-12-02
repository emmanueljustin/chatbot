import { StyleSheet, Text, View, Dimensions, Image, Button, Pressable, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconEnt from 'react-native-vector-icons/Entypo';
import HistorySection from './history-section';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setConvHistory } from '../../redux/chatSlice';
import CButton from '../../components/CButton';

const HomeScreen = () => {

  const dispatch = useDispatch<AppDispatch>();

  interface Users {
    born: number;
    first: string;
    last: string;
  }

  const router = useRouter();

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      <View style={styles.contentView}>
        <Text style={styles.headerStyle}>
          Chatter
          <Text style={{ color: '#FBBF24' }}>bot!</Text>
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
            Welcome
          </Text>
          <View style={{ 
            marginTop: 10,
            width: '65%',
          }}>
            <Text style={{
              fontWeight: '500',
              fontSize: 17,
            }}>
              Transform Your Interactions Powered by Gemini AI.
            </Text>
          </View>
        </View>

        <View style={styles.mainContentBox}>
          <View style={styles.contentBox}>
            <View style={styles.iconContainer}>
              <IconAnt name='staro' size={20} color={'#89D9F2'} />
            </View>
            <Text style={styles.contentText}>
              Generate new ideas and increase your productivity
            </Text>
          </View>

          <View style={styles.contentBox}>
            <View style={styles.iconContainer}>
              <IconEnt name='code' size={20} color={'#89D9F2'} />
            </View>
            <Text style={styles.contentText}>
              Open source and free
            </Text>
          </View>
        </View>

        <HistorySection />

        <View style={{ marginTop: 'auto' }}>
          <CButton
            children='Chats'
            onPress={() => {
              dispatch(setConvHistory([]));
              router.push('/chat');
            }}
          />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#141414',
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
    backgroundColor: '#9CA3AF',
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
    backgroundColor: '#89D9F2',
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
    alignItems: 'stretch',
  },
  contentBox: {
    backgroundColor: '#232323',
    borderWidth: 0.5,
    borderRadius: 15,
    // height: 150,
    width: '47%',
    overflow: 'hidden',
    padding: 15,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    padding: 10,
    backgroundColor: '#4B5563',
    overflow: 'hidden',
  },
  contentText: {
    marginTop: 10,
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 1.2
  },
})