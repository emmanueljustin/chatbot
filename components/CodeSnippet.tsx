import React from 'react';
import IconFeat from 'react-native-vector-icons/Feather';
import IconEnt from 'react-native-vector-icons/Entypo';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';

interface Props {
  code: string;
}

export const CodeSnippet: React.FC<Props> = (props) => {
  const lines = props.code.split('\n');

  const copyToClipboard = () => {
    Clipboard.setStringAsync(props.code);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconEnt name='code' size={20} color={'#89D9F2'} />
        <Text style={styles.codeTitle}>Code Snippet</Text>
        <TouchableOpacity onPress={copyToClipboard}>
          <IconFeat name='copy' size={20} color={'#fff'} />
        </TouchableOpacity>
      </View>
      <View style={styles.codeContainer}>
        <ScrollView style={{ flex: 1 }} horizontal>
          <View style={{ flexDirection: 'column' }}>
            {lines.map((line: string, index: number) => (
              <View key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={styles.lineNumbers}>
                  <Text style={styles.lineNumber}>
                    {index + 1}
                  </Text>
                </View>

                <View style={styles.code}>
                  <Text style={styles.codeLine}>
                    {line} 
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#5A5A5A'
  },
  codeTitle: {
    color: '#fff',
    fontWeight: '600',
  },
  codeContainer: {
    padding: 10,
    flexDirection: 'column',
    fontFamily: 'monospace',
  },
  lineNumbers: {
    marginRight: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  lineNumber: {
    fontFamily: 'monospace',
    color: '#888',
    textAlign: 'right',
  },
  code: {
    flex: 1,
  },
  codeLine: {
    fontFamily: 'monospace', 
    color: '#fff',
    paddingLeft: 10,
  },
});
