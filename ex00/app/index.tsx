import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [aboveText, setAboveText] = useState('A simple text');

  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.aboveText}>{aboveText}</Text>

      <Pressable style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonLabel}>Click me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    gap: 20,
  },
  aboveText: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 50,
    width: 200,
    textAlign: 'center',           
    textAlignVertical: 'center',   
    lineHeight: 50,
    fontSize: 18,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    includeFontPadding: false,
  },
  button: {
    width: 120,
    height: 50,
    backgroundColor: '#6200ee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  buttonLabel: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fff',
  },
});