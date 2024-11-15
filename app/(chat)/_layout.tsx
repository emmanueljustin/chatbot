import { Stack } from "expo-router"

const ChatLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='chat-screen' options={{ headerShown: false }} />
    </Stack>
  )
}

export default ChatLayout