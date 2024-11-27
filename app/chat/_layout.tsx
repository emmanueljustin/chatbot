import { Stack, useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { triggerPopup } from "../../redux/chatSlice";
import History from '../../interfaces/history';

const ChatLayout = () => {

  const { chats } = useGlobalSearchParams<{ chats: string }>();

  const parsedChats: History | undefined = chats ? JSON.parse(chats) : undefined;

  const dispatch = useDispatch<AppDispatch>();
  const [textColor, setTextColor] = useState('#fff')

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ 
          title: parsedChats ? parsedChats.chatTitle : 'Chat Bot',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#141414',
          },
          headerTintColor: '#fff',
          headerShadowVisible: false,
          headerRight: () => parsedChats ? null : (
            <Pressable
              hitSlop={{ top: 50, left: 50, bottom: 50, right: 50 }}
              onPressIn={() => setTextColor('#89D9F2')}
              onPressOut={() => setTextColor('#fff')}
              onPress={() => dispatch(triggerPopup(true))}
            >
              <Text style={{ padding: 10, fontSize: 17, fontWeight: 'bold', color: textColor }}>Save</Text>
            </Pressable>
          ),
        }}
      />
    </Stack>
  )
}

export default ChatLayout