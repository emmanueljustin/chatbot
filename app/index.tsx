import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Asset } from "expo-asset";
import CreativeButton from "@/components/CreativeButton";
import { StatusBar } from "expo-status-bar";

export default function App() {

  const svgUri = Asset.fromModule(require('../assets/images/react.svg')).uri;

  return(
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView style={styles.screen}>
        <StatusBar backgroundColor="#FFFFFF" />

        <View className="flex flex-col justify-stretch h-full">

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
            <View className="flex flex-col"></View>
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
    fontFamily: 'RubikMonoOne-Regular',
    fontSize: 30,
    lineHeight: 36,
    color: '#fff',
  },
  buttonContainer: {
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 20,
    marginTop: 'auto',
  }
})