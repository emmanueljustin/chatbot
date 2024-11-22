import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='home-screen' options={{ headerShown: false }} />
    </Stack>
  )
}

export default HomeLayout