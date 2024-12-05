import { Stack, useGlobalSearchParams } from "expo-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { triggerDeletePopup, triggerSavePopup } from "../../redux/chatSlice";
import History from '../../interfaces/history';
import AppBarButton from "./app-bar-button";
import useLocalization from "@/hooks/useLocalization";

const ChatLayout = () => {

  const { chats } = useGlobalSearchParams<{ chats: string }>();
  const parsedChats: History | undefined = chats ? JSON.parse(chats) : undefined;

  const dispatch = useDispatch<AppDispatch>();

  const { t } = useLocalization();

  return (
    <Stack screenOptions={{
      animation: 'none'
    }}>
      <Stack.Screen
        name='index'
        options={{ 
          title: parsedChats ? parsedChats.chatTitle : t('chats.defaultTitle'),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#141414',
          },
          headerTintColor: '#fff',
          headerShadowVisible: false,
          headerRight: () => (
            <AppBarButton
              fromHistory={parsedChats ? true : false}
              onPress={
                parsedChats 
                ? () => dispatch(triggerDeletePopup(true))
                : () => dispatch(triggerSavePopup(true))
              }
            />
          ),
        }}
      />
    </Stack>
  )
}

export default ChatLayout