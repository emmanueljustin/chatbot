import { Stack } from "expo-router";
import { useState } from "react";
import { Text, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { triggerPopup } from "../../redux/chatSlice";

const ChatLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [textColor, setTextColor] = useState('#fff')

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ 
          title: 'Chat Bot' ,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#141414',
          },
          headerTintColor: '#fff',
          headerShadowVisible: false,
          headerRight: () => (
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