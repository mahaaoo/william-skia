import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import BackgroundGradient from './BackgroundGradient';

const { width } = Dimensions.get('window');

const HEIGHT = 256;
const WIDTH = width * 0.9

interface CardProps {
};

const CARD_HEIGHT = HEIGHT - 5;
const CARD_WIDTH = WIDTH - 5;

const Card: React.FC<CardProps> = props => {
  const {} = props;

  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const gesture = Gesture.Pan()
  .onBegin(({x,y}) => {
    rotateX.value = withTiming(interpolate(y, [0, CARD_WIDTH], [10, -10], Extrapolate.CLAMP));
    rotateY.value = withTiming(interpolate(x, [0, CARD_HEIGHT], [-10, 10], Extrapolate.CLAMP));
  })
  .onUpdate(({ x, y }) => {
    rotateX.value = interpolate(y, [0, CARD_WIDTH], [10, -10], Extrapolate.CLAMP);
    rotateY.value = interpolate(x, [0, CARD_HEIGHT], [-10, 10], Extrapolate.CLAMP);
  })
  .onFinalize(() => {
    rotateX.value = withSpring(0);
    rotateY.value = withSpring(0);
  })



  const animation = useAnimatedStyle(() => {
    return {
      transform: [{
        perspective: 300
      }, {
        rotateX: `${rotateX.value}deg`,
      }, {
        rotateY: `${rotateY.value}deg`,
      }]
    }
  })

  return (
    <View style={styles.container}>
      <BackgroundGradient width={WIDTH} height={HEIGHT} />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[{
          height: CARD_HEIGHT,
          width: CARD_WIDTH,
          backgroundColor: 'black',
          position: 'absolute',
          borderRadius: 20,
          zIndex: 100,
        }, animation]} />
      </GestureDetector>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  }
})

export default Card;
