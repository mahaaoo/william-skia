import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import {
  Blur,
  Canvas,
  Fill,
  SweepGradient,
  useComputedValue,
  vec,
  Group,
  Rect
} from '@shopify/react-native-skia';

export const Overlay = ({ progressSkia }: any) => {
  // state
  const { width, height } = useWindowDimensions();
  const transform = useComputedValue(
    () => [
      { rotateZ: (progressSkia.current) * Math.PI / 180 },
    ],
    [progressSkia],
  );

  // render
  return (
    <>
      <Canvas style={StyleSheet.absoluteFillObject}>
        <Fill>
          <SweepGradient
            origin={{ x: width / 2, y: height / 2 }}
            transform={transform}
            c={vec(width / 2, height / 2)}
            colors={['cyan', 'magenta', '#44bd32', 'cyan']}
          />
          <Blur blur={50} />
        </Fill>
      </Canvas>
    </>
  );
};
