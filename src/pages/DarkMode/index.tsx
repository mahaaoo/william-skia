import { Canvas, Circle, Image, ImageShader, dist, makeImageFromView, mix, vec } from '@shopify/react-native-skia';
import React, { useCallback, useReducer, useRef } from 'react';
import {View, Text, Dimensions, StyleSheet, Button} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');
const corners = [vec(0, 0), vec(width, 0), vec(0, height),vec(width, height)];

interface DarkModeProps {
};

const defaultValue = {
  active: false,
  color: 'light',
  overlay1: null,
  overlay2: null,
}

const colorReducer = (_, newColor) => {
  return newColor;
}

const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const DarkMode: React.FC<DarkModeProps> = props => {
  const {navigation} = props;

  const [{
    color, overlay1, overlay2, active
  }, dispath] = useReducer(colorReducer, defaultValue)

  const circle = useSharedValue({ x: 0, y: 0, r: 0 });
  const transition = useSharedValue(0);
  const ref = useRef(null);
  const r = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.r);
  })

  const toggle = useCallback(async (x, y) => {
    const newColor = color === 'light' ? 'dark' : 'light';

    dispath({
      active: true,
      color,
      overlay1: null,
      overlay2: null,
    });

    const r = Math.max(...corners.map((corner) => dist(corner, { x, y })))
    circle.value = { x, y, r }

    const overlay1 = await makeImageFromView(ref);

    dispath({
      active: true,
      color,
      overlay1,
      overlay2: null,
    })
    await wait(16);

    dispath({
      active: true,
      color: newColor,
      overlay1,
      overlay2: null,
    })
    await wait(16);
    const overlay2 = await makeImageFromView(ref);

    dispath({
      active: true,
      color: newColor,
      overlay1,
      overlay2,
    })

    transition.value = 0;
    transition.value = withTiming(1, { duration: 650 });

    await wait(650);

    dispath({
      active: false,
      color: newColor,
      overlay1: null,
      overlay2: null,
    })

  }, [dispath, circle, transition, ref, color]);

  const tap = Gesture.Tap()
  .runOnJS(true)
  .onStart(async (e) => {
    if (!active) {
      toggle(e.absoluteX, e.absoluteY);
    }
  })

  return (
    <View style={{ flex: 1 }}>
      <View ref={ref} style={{ backgroundColor: color === 'light' ? 'white' : 'black' ,flex: 1, justifyContent: 'center', alignItems: 'center' }} collapsable={false}>
        <Button title={'Back'} onPress={navigation.goBack} />
        <GestureDetector gesture={tap}>
          <Text style={{ fontSize: 24, color: color === 'light' ? 'black' : 'white' }}>{color === 'light' ? 'Dark' : 'Light'}</Text>
        </GestureDetector>
      </View>
      <Canvas style={StyleSheet.absoluteFill} pointerEvents='none'>
        <Image image={overlay1} x={0} y={0} width={width} height={height} />
        {overlay2 && (
          <Circle r={r} c={circle}>
            <ImageShader
              image={overlay2}
              x={0} y={0} width={width} height={height}
              fit={'cover'}
            />
          </Circle>
        )}
      </Canvas>
    </View>
  )
};

export default DarkMode;
