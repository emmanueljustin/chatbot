import { Stack } from "expo-router"

const ChatLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='chat-screen'
        options={{ 
          title: 'Chat Bot' ,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#141414',
          },
          headerTintColor: '#fff',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  )
}

export default ChatLayout