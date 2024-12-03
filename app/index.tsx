import { View, Text, StyleSheet, Image, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import CButton from "@/components/CButton";
import { useRouter } from "expo-router";
import CLocalizationButton from "@/components/CLocalizationButton";
import useLocalization from "@/hooks/useLocalization";

const App = () => {

  const { t, currentLanguage } = useLocalization();

  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor="#141414" />

        <View style={styles.body}>
          
          <View style={styles.localeBtn}>
            <CLocalizationButton />
          </View>
          

          <View  style={styles.headerContainer}>
            <Image
              source={require("../assets/images/robot.png")}
              style={{
                height: 150,
                width: 150,
                marginBottom: 50,
              }}
            />
            {currentLanguage === "en" && (
              <Text style={styles.headerTitle}>
                Welcome to<Text style={{ color: '#89D9F2'}}>Chatter</Text>
                <Text style={{ color: '#FBBF24' }}>bot</Text>
              </Text>
            )}
            {currentLanguage === "ja" && (
              <Text style={[
                styles.headerTitle,
                {
                  fontFamily: 'ZenAntiqueSoft-Regular',
                  fontWeight: '900'
                }
              ]}>
                <Text style={{ color: '#89D9F2'}}>チャタ</Text>
                <Text style={{ color: '#FBBF24' }}>ーボット</Text>
                 へようこそ
              </Text>
            )}
            <View style={{
              marginTop: 50,
            }}>
              <Text style={[styles.headerSubtitle, {
                fontFamily: currentLanguage === "ja" ? 'ZenAntiqueSoft-Regular': 'RubikMonoOne-Regular',
              }]}>
                {t('intro.develop')}
              </Text>
              <Text style={[styles.headerSubtitle, {color: '#FBBF24'}]}>
                Emmanuel Justin Atienza
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CButton
              children={t('intro.next')}
              onPress={() => {
                router.replace('/home');
              }}
            />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: '#141414'
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    height: '100%',
  },
  localeBtn: {
    marginTop: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#1F2937b',
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
  },
})