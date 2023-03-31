import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Canvas, Skia, Shader, Fill, vec, useTouchHandler, useValue, useComputedValue, useClockValue } from '@shopify/react-native-skia';

interface IndexProps {}

 
const source = Skia.RuntimeEffect.Make(`
uniform float2 window;
uniform float2 center;
uniform float2 pointer;
uniform float clock;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

struct Cube {
  float left;
  float right;
  float top;
  float bottom;
};

float drawBox(vec2 st) {
  float left = .2;
  float right = 0.4;
  float top = 0.5;
  float bottom = 0.4;
  if (st.x > left && st.x < right && st.y > bottom && st.y < top) {
    return 1.0;
  } else {
    return 0.0;
  }
}

vec4 main(vec2 pos) {
  vec2 st = pos.xy/window;
  vec3 color = vec3(1.0);

  // step(vec2(0.1),st)
  // vec2 bl = smoothstep(.1, .2, st);       // bottom-left
  // vec2 tr = step(vec2(0.1),1.0-st);   // top-right

  color = mix(color, colorA, drawBox(st));

  return vec4(color,1.0);
}`)!;


const Index: React.FC<IndexProps> = (props) => {
  const {} = props;

  const { width, height } = useWindowDimensions();
  const center = vec(width / 2, height / 2);
  const clock = useClockValue();
  const pointer = useValue(center);
  const window = vec(width, width);

  const onTouch = useTouchHandler({
    onActive: (e) => {
      pointer.current = e;
    }
  })

  const uniforms = useComputedValue(() => {
    return { center, pointer: pointer.current, clock: clock.current, window }
  }, [pointer, clock])

  return (
    <Canvas style={{ width, height: width }} onTouch={onTouch}>
      <Fill>
        <Shader source={source} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
};

export default Index;
