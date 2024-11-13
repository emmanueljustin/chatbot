import { Text,TouchableOpacity } from 'react-native';
import React from 'react';

interface Props {
  onPressed: () => void;
  colors: string;
  textStyle: string;
  isLoading?: boolean;
  name: string;
}

const CreativeButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPressed}
      activeOpacity={0.7}
      className={`${props.isLoading ? `opacity-65` : ``} rounded-full w-full px-5 py-3 flex justify-center items-center ${props.colors}`}
      disabled={props.isLoading}
      style={{
        elevation: 20,
      }}
    >
      <Text className={props.textStyle}>{props.name}</Text>
    </TouchableOpacity>
  )
}

export default CreativeButton