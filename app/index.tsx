import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Asset } from "expo-asset";
import CreativeButton from "@/components/CreativeButton";
import { StatusBar } from "expo-status-bar";

export default function App() {

  const svgUri = Asset.fromModule(require('../assets/images/react.svg')).uri;

  return(
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.screen}>
        <StatusBar backgroundColor="#FFFFFF" />

        <View style={styles.body}>

          <View style={styles.headerContainer}>
            <Image
              source={require("../assets/images/robot.png")}
              style={{
                height: 150,
                width: 150,
                marginBottom: 50,
              }}
            />
            <Text style={styles.headerTitle}>Welcome to chatterbot</Text>
            <View style={{
              marginTop: 50,
            }}>
              <Text style={styles.headerSubtitle}>
                Developed by
              </Text>
              <Text style={[styles.headerSubtitle, {color: '#FFA500'}]}>
                Emmanuel Justin Atienza
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CreativeButton
              onPressed={() => {console.log('hello')}}
              name="Continue"
              colors="bg-sky-400"
              textStyle="text-white text-2xl font-bold"
            />
            {/* <Link
              href={"/chat"}
              className="mb-5 w-full font-bold text-lg text-center text-white px-5 py-3 rounded-full bg-sky-600 active:opacity-65"
              style={{
                elevation: 10,
              }}
            >
            Chat with Gemini
            </Link> */}
          </View>

        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: 'black'
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    height: '100%',
  },
  headerContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#111827',
    overflow: 'hidden',
    padding: 40,
  },
  headerTitle: {
    textAlign: 'center',
    fontFamily: 'RubikMonoOne-Regular',
    fontSize: 30,
    lineHeight: 36,
    color: '#fff',
  },
  headerSubtitle: {
    textAlign: 'center',
    fontFamily: 'RubikMonoOne-Regular',
    fontSize: 15,
    lineHeight: 21,
    color: '#fff',
  },
  buttonContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    marginTop: 'auto',
  }
})