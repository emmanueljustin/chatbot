import React, { useEffect } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './redux/store';

import "../assets/global.css"

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [fontsLoaded, error] = useFonts({
    "Rubik-VariableFont_wght": require("../assets/fonts/Rubik-VariableFont_wght.ttf"),
    "Rubik-Italic-VariableFont_wght": require("../assets/fonts/Rubik-Italic-VariableFont_wght.ttf"),
    "RubikMonoOne-Regular": require("../assets/fonts/RubikMonoOne-Regular.ttf"),
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(home)' options={{ headerShown: false }} />
        <Stack.Screen name='(chat)' options={{ headerShown: false }} />
      </Stack>
    </Provider>
  )
}

export default RootLayout;