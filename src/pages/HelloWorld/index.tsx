import React from 'react';
import {Dimensions} from 'react-native';
import {Canvas, Circle, Group} from '@shopify/react-native-skia';

const {width: W, height: H} = Dimensions.get('window');

const HelloWorld = () => {
  const r = 125;
  return (
    <Canvas style={{flex: 1}}>
      <Group blendMode="multiply">
        <Circle cx={W/2 - r/2} cy={H/2 - r/2} r={r} color="cyan" />
        <Circle cx={W/2 - r/2} cy={H/2 + r/2} r={r} color="magenta" />
        <Circle cx={W/2 + r/2} cy={H/2 - r/2} r={r} color="yellow" />

        <Circle cx={200} cy={100} r={20} color="red" />

      </Group>
    </Canvas>
  );
};

export default HelloWorld;
