import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Switch } from 'react-native-switch';
import useLocalization from '@/hooks/useLocalization';

const CLocalizationButton = () => {
  
  const { changeLanguage, currentLanguage } = useLocalization();

  const [active, setActive] = useState<boolean>(false);

  return (
    <Switch
      value={currentLanguage === "ja" ? true : false}
      onValueChange={(val: boolean) => {
        setActive(val);
        changeLanguage(val ? 'ja' : 'en');
      }}
      renderInsideCircle={() => 
        <Text style={{
          color: '#fff',
          fontWeight: 'bold'
        }}>
          {currentLanguage === "ja" ? 'JA' : 'EN'}
        </Text>
      }
      activeText={''}
      inActiveText={''}
      disabled={false}
      backgroundActive={'#4B5563'}
      backgroundInactive={'gray'}
      circleActiveColor={'#89D9F2'}
      circleInActiveColor={'#232323'}
      changeValueImmediately={true}
      switchLeftPx={3}
      switchRightPx={3}
      switchWidthMultiplier={2}
      circleSize={30}
    />
  )
}

export default CLocalizationButton