import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  // StatusBar,
} from 'react-native';
import { evaluate } from 'mathjs';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';

const App = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isLandscape = width > height;
  const operators = ['+', '-', '*', '/'];
  const isOperator = (char: string) => operators.includes(char);

  const statusBarHeight = insets.top;

  const handlePress = (value: string) => {
  switch (value) {
    case 'AC':
      setExpression('');
      setResult('');
      break;
    case 'C':
      setExpression(expression.slice(0, -1));
      break;
    case '=':
      evaluateExpression();
      break;
    default: {
      const lastChar = expression.slice(-1);
      console.log('lastChar:', lastChar, 'value:', value);

      if (isOperator(value)) {
        console.log('isOperator(value):', isOperator(value));
        if (!expression) return;
        if (isOperator(lastChar) && lastChar === value) return;
      }

      if (value === '.') {
        const lastNumber = expression.split(/[\+\-\*\/]/).pop();
        console.log('lastNumber:', lastNumber);
        if (lastNumber && lastNumber.includes('.')) return;
      }

      setExpression(expression + value);
    }
  }
};

  const evaluateExpression = () => {
    if (!expression.trim()) {
      setResult('');
      return;
    }
    try {
      const evalResult = evaluate(expression);
      setResult(evalResult.toString());
    } catch (error) {
      setResult('Expression Error.');
    }
  };

  const buttons = [
    ['AC', 'C', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <View style={[styles.container]} >
      <StatusBar style='dark' backgroundColor="#6200ee" />
      <View style={[styles.header, { paddingTop: statusBarHeight, paddingBottom: 16 }]}>
        <Text style={styles.headerTitle}>Calculator</Text>
      </View>

      <View style={[styles.displayContainer, isLandscape && styles.displayContainerLandscape]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.expressionScroll}>
          <Text style={styles.expressionText}>{expression || '0'}</Text>
        </ScrollView>
        <View style={styles.resultWrapper}>
          <Text style={styles.resultText}>{result || '0'}</Text>
        </View>
      </View>

      <View style={[styles.buttonPad, isLandscape && styles.buttonPadLandscape]}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((btn) => { 
              let buttonStyle = styles.button;
              if (btn === 'AC' || btn === 'C') 
                buttonStyle = styles.specialButton;
              else if  (['/', '*', '-', '+', '='].includes(btn)) 
                buttonStyle = styles.operatorButton;

              return (
                <TouchableOpacity
                  key={btn}
                  style={[buttonStyle, { flex: btn === '0' ? 2 : 1 }]}
                  onPress={() => handlePress(btn)}>
                  <Text style={styles.buttonText}>{btn}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    // padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  displayContainer: {
    flex: 1.5,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'space-between',
    // elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  displayContainerLandscape: {
    flex: 2,
  },
  expressionScroll: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
  },
  expressionText: {
    fontSize: 30,
    color: '#333',
    textAlign: 'right',
  },
  resultWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 8,
    paddingTop: 8,
    alignItems: 'flex-end',
  },
  resultText: {
    fontSize: 28,
    color: '#6200ee',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  buttonPad: {
    flex: 3,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  buttonPadLandscape: {
    flex: 4,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 4,
  },
  button: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  specialButton: {
    flex: 1,
    backgroundColor: '#ffcdd2',
    marginHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  operatorButton: {
    flex: 1,
    backgroundColor: '#e1bee7',
    marginHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
  },
});

export default App;