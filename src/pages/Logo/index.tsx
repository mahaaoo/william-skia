import React from 'react';
import {Dimensions} from 'react-native';
import {BlurMask, Canvas, Circle, Group, Oval, SweepGradient} from '@shopify/react-native-skia';

const {width, height} = Dimensions.get('window');

const center = {
  x: width / 2,
  y: height / 2 - 64,
}

const rct = {
  x: width / 2 - 150,
  y: height / 2 - 64 - 50,
  width: 300,
  height: 100,
}

interface LogoProps {
};

const Logo: React.FC<LogoProps> = props => {
  const {} = props;
  return (
    <Canvas style={{ flex: 1 }}>
      <Circle c={center} r={25} color="lightblue">
        <BlurMask blur={20} style="inner" respectCTM={false} />
      </Circle>
      <Group style="stroke" strokeWidth={18}>
        <Oval rect={rct} />
        <Group transform={[{
          rotate: Math.PI / 3,
        }]} origin={center}>
          <Oval rect={rct} />
        </Group>
        <Group transform={[{
          rotate: -Math.PI / 3,
        }]} origin={center}>
          <Oval rect={rct} />
        </Group>
        <BlurMask blur={20} style="inner" respectCTM={false} />
        <SweepGradient c={center} colors={['blue', 'red', 'blue']} />
        {/* <DiscretePathEffect deviation={5} length={10} seed={5} /> */}
        {/* <DashPathEffect intervals={[10, 10]} /> */}
      </Group>
    </Canvas>
  )
};

export default Logo;
