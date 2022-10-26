import { BlurMask, Canvas, RoundedRect, SweepGradient, useSharedValueEffect, vec, useValue } from '@shopify/react-native-skia';
import React, { useEffect } from 'react';
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

interface BackgroundGradientProps {
  width?: number;
  height?: number;
};

const BackgroundGradient: React.FC<BackgroundGradientProps> = props => {
  const {width, height} = props;
  const canvasPadding = 40;
  const rValue = useSharedValue(0);
  const skValue = useValue(0);

  useEffect(() => {
    rValue.value = withRepeat(withTiming(10, {duration: 2000}), -1, true);
  }, []);

  useSharedValueEffect(() => {
    skValue.current = rValue.value;
  }, rValue);

  return (
    <Canvas style={{width: width + 40, height: height + 40}}>
      <RoundedRect 
        x={canvasPadding/2} 
        y={canvasPadding/2} 
        width={width} 
        height={height} 
        color={"white"}
        r={20}
      >
        <SweepGradient
          c={vec((width + 40) / 2, (height + 40) / 2)}
          colors={['cyan', 'magenta', 'yellow', 'cyan']}
        />
        <BlurMask blur={skValue} style={'solid'} />
      </RoundedRect>
    </Canvas>
  )
};

export default BackgroundGradient;