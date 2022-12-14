import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomePage from './src/Home';
import HelloWorld from './src/pages/HelloWorld';
import HelloWorld2 from './src/pages/HelloWorld2';
import Logo from './src/pages/Logo';
import Hue from './src/pages/Hue';
import { ReactLogo } from './src/pages/ReactLogo';
import { SkiaLogo } from './src/pages/SkiaLogo';
import Card from './src/pages/Card';
import { PathGradient } from './src/pages/PathGradient';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Skia Demos" component={HomePage} />
          <Stack.Screen name="Hello World" component={HelloWorld} />
          <Stack.Screen name="Hello World2" component={HelloWorld2} />
          <Stack.Screen name="Logo" component={Logo} />
          <Stack.Screen name="Hue" component={Hue} />
          <Stack.Screen name="ReactLogo" component={ReactLogo} />
          <Stack.Screen name="SkiaLogo" component={SkiaLogo} />
          <Stack.Screen name="Card" component={Card} />
          <Stack.Screen name="PathGradient" component={PathGradient} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}


export default App;